import { query, execute, getPool } from './mysql';

export const DB_NAME = process.env.MYSQL_DATABASE || 'sellgrow';

function mapTableName(collectionName) {
  if (collectionName === 'superadmin/employees') return 'employees';
  if (collectionName === 'superadmin/sub-admin') return 'team';
  if (collectionName === 'superadmin/images') return 'superadmin_images';
  return collectionName.replace(/\//g, '_');
}

function parseJsonField(val) {
  if (val === null || val === undefined) return val;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
}

function formatRow(table, row) {
  if (!row) return null;
  const formatted = { ...row };
  
  if (formatted.id && !formatted._id) {
    formatted._id = String(formatted.id);
  }

  // Parse JSON fields based on table
  if (table === 'products') {
    formatted.highlights = parseJsonField(formatted.highlights) || [];
    formatted.specs = parseJsonField(formatted.specs) || {};
    formatted.voiceGreeting = parseJsonField(formatted.voice_greeting) || {};
    formatted.shortDesc = formatted.short_desc;
    formatted.fullDesc = formatted.full_desc;
    formatted.cuttingWidth = formatted.cutting_width;
    formatted.fuelCapacity = formatted.fuel_capacity;
    formatted.imageBgColor = formatted.image_bg_color;
    formatted.hologramVideo = formatted.hologram_video;
  } else if (table === 'services') {
    formatted.features = parseJsonField(formatted.features) || [];
    formatted.priceMonthlyINR = formatted.price_monthly_inr;
    formatted.priceMonthlyUSD = formatted.price_monthly_usd;
    formatted.priceYearlyINR = formatted.price_yearly_inr;
    formatted.priceYearlyUSD = formatted.price_yearly_usd;
    formatted.successRate = formatted.success_rate;
    formatted.requests24h = formatted.requests_24h;
  } else if (table === 'team') {
    formatted.assignedServices = parseJsonField(formatted.assigned_services) || [];
    formatted.sgId = formatted.sg_id;
    formatted.authKey = formatted.auth_key;
    formatted.adminLevel = formatted.admin_level;
  } else if (table === 'employees') {
    formatted.assignedSubAdmin = formatted.assigned_sub_admin;
  } else if (table === 'users' || table === 'registered_users') {
    formatted.firstName = formatted.first_name;
    formatted.passwordHash = formatted.password_hash;
    formatted.businessName = formatted.business_name;
    formatted.businessType = formatted.business_type;
    formatted.businessCategory = formatted.business_category;
    formatted.companyLogo = formatted.company_logo;
    formatted.isEmailVerified = Boolean(formatted.is_email_verified);
    formatted.createdAt = formatted.created_at;
    formatted.updatedAt = formatted.updated_at;
    formatted.lastLogin = formatted.last_login;
  } else if (table === 'superadmin_images') {
    formatted.imageBase64 = formatted.image_base64;
    formatted.mimeType = formatted.mime_type;
    formatted.updatedAt = formatted.updated_at;
  } else if (table === '_meta') {
    formatted.key = formatted.meta_key;
    formatted.seeded = Boolean(formatted.seeded);
    formatted.seededAt = formatted.seeded_at;
  }

  return formatted;
}

export class CollectionWrapper {
  constructor(name) {
    this.name = name;
    this.table = mapTableName(name);
  }

  find(filter = {}) {
    const self = this;
    const fetchRows = async () => {
      const { sql, params } = self._buildWhereClause(filter);
      const rows = await query(`SELECT * FROM \`${self.table}\` ${sql}`, params);
      return rows.map((r) => formatRow(self.table, r));
    };

    return {
      toArray: fetchRows,
      then: (resolve, reject) => fetchRows().then(resolve, reject),
      catch: (reject) => fetchRows().catch(reject),
    };
  }

  async findOne(filter = {}) {
    const { sql, params } = this._buildWhereClause(filter);
    const rows = await query(`SELECT * FROM \`${this.table}\` ${sql} LIMIT 1`, params);
    if (!rows.length) return null;
    return formatRow(this.table, rows[0]);
  }

  async countDocuments(filter = {}) {
    const { sql, params } = this._buildWhereClause(filter);
    const rows = await query(`SELECT COUNT(*) as count FROM \`${this.table}\` ${sql}`, params);
    return rows[0] ? rows[0].count : 0;
  }

  async insertOne(doc) {
    const columns = [];
    const placeholders = [];
    const values = [];

    const dbMap = this._mapDocToColumns(doc);

    for (const [col, val] of Object.entries(dbMap)) {
      columns.push(`\`${col}\``);
      placeholders.push('?');
      values.push(val);
    }

    const sql = `INSERT INTO \`${this.table}\` (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`;
    const result = await execute(sql, values);

    return {
      insertedId: doc.id || doc._id || result.insertId,
      acknowledged: true,
    };
  }

  async insertMany(docs) {
    for (const doc of docs) {
      await this.insertOne(doc);
    }
    return { acknowledged: true, insertedCount: docs.length };
  }

  async updateOne(filter, update, options = {}) {
    const setDoc = update.$set || update;
    const dbMap = this._mapDocToColumns(setDoc);

    const setClauses = [];
    const values = [];

    for (const [col, val] of Object.entries(dbMap)) {
      setClauses.push(`\`${col}\` = ?`);
      values.push(val);
    }

    const { sql: whereSql, params: whereParams } = this._buildWhereClause(filter);

    if (setClauses.length > 0) {
      const sql = `UPDATE \`${this.table}\` SET ${setClauses.join(', ')} ${whereSql}`;
      const result = await execute(sql, [...values, ...whereParams]);

      if (result.affectedRows === 0 && options.upsert) {
        // Perform insert if upsert is true
        const combined = { ...filter, ...setDoc };
        await this.insertOne(combined);
      }
    }

    return { acknowledged: true };
  }

  async deleteOne(filter) {
    const { sql, params } = this._buildWhereClause(filter);
    await execute(`DELETE FROM \`${this.table}\` ${sql} LIMIT 1`, params);
    return { acknowledged: true };
  }

  _buildWhereClause(filter) {
    if (!filter || Object.keys(filter).length === 0) {
      return { sql: '', params: [] };
    }

    const conditions = [];
    const params = [];

    for (const [k, v] of Object.entries(filter)) {
      if (k === 'key') {
        conditions.push('`meta_key` = ?');
        params.push(v);
      } else if (k === 'email') {
        conditions.push('LOWER(`email`) = ?');
        params.push(String(v).toLowerCase());
      } else if (k === 'type') {
        conditions.push('`type` = ?');
        params.push(v);
      } else if (k === 'id' || k === '_id') {
        conditions.push('(`id` = ? OR `id` = ?)');
        params.push(String(v), Number(v) || v);
      } else if (k === 'status') {
        conditions.push('`status` = ?');
        params.push(v);
      } else {
        const col = k.replace(/([A-Z])/g, '_$1').toLowerCase();
        conditions.push(`\`${col}\` = ?`);
        params.push(v);
      }
    }

    return {
      sql: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '',
      params,
    };
  }

  _mapDocToColumns(doc) {
    const map = {};
    for (const [k, v] of Object.entries(doc)) {
      if (k === '_id') continue;
      
      let colName = k;
      if (k === 'firstName') colName = 'first_name';
      else if (k === 'passwordHash') colName = 'password_hash';
      else if (k === 'businessName') colName = 'business_name';
      else if (k === 'businessType') colName = 'business_type';
      else if (k === 'businessCategory') colName = 'business_category';
      else if (k === 'companyLogo') colName = 'company_logo';
      else if (k === 'isEmailVerified') colName = 'is_email_verified';
      else if (k === 'shortDesc') colName = 'short_desc';
      else if (k === 'fullDesc') colName = 'full_desc';
      else if (k === 'cuttingWidth') colName = 'cutting_width';
      else if (k === 'fuelCapacity') colName = 'fuel_capacity';
      else if (k === 'imageBgColor') colName = 'image_bg_color';
      else if (k === 'hologramVideo') colName = 'hologram_video';
      else if (k === 'voiceGreeting') colName = 'voice_greeting';
      else if (k === 'priceMonthlyINR') colName = 'price_monthly_inr';
      else if (k === 'priceMonthlyUSD') colName = 'price_monthly_usd';
      else if (k === 'priceYearlyINR') colName = 'price_yearly_inr';
      else if (k === 'priceYearlyUSD') colName = 'price_yearly_usd';
      else if (k === 'assignedSubAdmin') colName = 'assigned_sub_admin';
      else if (k === 'assignedServices') colName = 'assigned_services';
      else if (k === 'sgId') colName = 'sg_id';
      else if (k === 'authKey') colName = 'auth_key';
      else if (k === 'adminLevel') colName = 'admin_level';
      else if (k === 'imageBase64') colName = 'image_base64';
      else if (k === 'mimeType') colName = 'mime_type';
      else if (k === 'key') colName = 'meta_key';
      else if (k === 'seededAt') colName = 'seeded_at';

      if (typeof v === 'object' && v !== null && !(v instanceof Date)) {
        map[colName] = JSON.stringify(v);
      } else if (v instanceof Date) {
        map[colName] = v.toISOString().slice(0, 19).replace('T', ' ');
      } else {
        map[colName] = v;
      }
    }
    return map;
  }
}

export async function getDatabase() {
  return {
    collection: (name) => new CollectionWrapper(name),
    listCollections: () => ({
      toArray: async () => [
        { name: 'system_settings' },
        { name: 'users' },
        { name: 'registered_users' },
        { name: 'products' },
        { name: 'services' },
        { name: 'employees' },
        { name: 'team' },
        { name: 'superadmin_images' },
        { name: 'subscriptions' },
        { name: '_meta' }
      ]
    })
  };
}

export async function getCollection(collectionName) {
  return new CollectionWrapper(collectionName);
}

export { query, execute, getPool };
