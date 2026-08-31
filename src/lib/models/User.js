export function formatUserResponse(user) {
    return {
        id: user._id ? user._id.toString() : '',
        name: user.name || user.firstName || '',
        firstName: user.firstName || user.name || '',
        email: user.email,
        phone: user.phone || '',
        businessName: user.businessName,
        businessType: user.businessType || user.businessCategory || 'Retail Shop',
        businessCategory: user.businessCategory || user.businessType || 'Retail Shop',
        companyLogo: user.companyLogo || '',
        isEmailVerified: user.isEmailVerified ?? true,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString(),
    };
}
