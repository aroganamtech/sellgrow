Introduction

This dataset contains brochures, booklets, and maps from Pan American World Airways from the 1930s-1980s. Many feature Pan Am's destinations in Asia, the Pacific, the Caribbean, Central and South America, Europe, the Middle East, and the United States. Other brochures feature specific aircraft, services offered by Pan Am, or tips for enjoyable air travel. These brochures are from the 3 boxes of the Printed Materials: Brochures and Booklets series. 

This release includes 443 brochures, booklets, and maps. In total, there are 4,830 pages of text available for download. Most pages are in English, with some in Spanish. We have also included a file roster in CSV format, listing each file ID along with its metadata.


Potential Starting Points 

Pan Am published brochures and other promotional materials throughout its years of operations to promote commercial air travel. Many of the brochures promote travel destinations around the world, providing travel advice and overviews of tourist activities and local culture. Pan Am also published a series of in-depth travel guides for countries in Europe, Asia, South America, and the Caribbean. To learn more about Pan Am’s destinations and routes, try searching for specific regions, countries, cities, and other geographical locations.  

Other brochures provide information about the passenger travel experience, such as clearing customs, group travel, traveling with children, or first class service. Searching words like "passenger", "customer service", "economy", "first class", "travel", or "tourism" would help reveal information about the passenger experience.  
Pan Am also published brochures documenting company history, historical milestones, working at Pan Am, and advances in aviation. Examples include facts and figures about Pan Am, the 30th anniversary of the China Clipper, the arrival of Clipper jets, and an overview of the Boeing 727 airplane. Searching words like "flight", "clipper", "jet", "route", or specific airplane names or models could be useful. Also try searching for "pilot" or "flight attendant" or "employee" to learn more about Pan Am's workforce.         

If you’re new to text mining or distant reading, Heather Froehlich’s AntConc tutorial at the Programming Historian is an excellent introduction (https://programminghistorian.org/en/lessons/corpus-analysis-with-antconc). AntConc is a freely available tool for text mining and corpus linguistics, with versions available for Macintosh, Windows, and Linux operating systems (http://www.laurenceanthony.net/software/antconc/). 


Data Creation Process

We used optical character recognition (OCR) to generate plain text to accompany the page scans -- and though the text for each page is available in our Digital Collections, we wanted to make it easy for researchers to download the text in bulk for purposes of distant reading.

The OCR in this dataset is uncorrected but fairly clear, though if you notice consistent errors that could be effectively corrected in bulk, you are welcome to alert us.

One complex aspect of working with this data (especially in tools like AntConc) is the filename for each page of text. With larger text corpora, generating separate human-readable names would be a challenge, and could cause confusion because each object (in this case, each page of an archival folder) also has an existing filename in our catalog, consisting of a repository code and a string of numbers. Those filenames, however, are searchable within our Digital Collections (https://digitalcollections.library.miami.edu/digital/). If you paste a filename number (i.e. 'asm03410013190001001') into the search field, you'll be able to retrieve the specific page, so that you can check the OCR against the original page image. We've included a guide to our file naming conventions below.


File Naming Conventions

Each image has a unique file name, which provides information about its relationship to its collection and to other files in the collection. File names consist of five component parts:

Repository:	_asm_03410000010001001
Collection:	asm_0341_0000010001001 
Object:		asm0314_000001_0001001 
Sequence: 	asm0314000001_0001_001 
Detail/Format:	asm03140000010001_001_ 

Each part of the file name provides information about the file:

Repository – three-letter code which identifies the unit within UM Libraries where the source material is housed. The most common codes are: asm = Special Collections, asu = University Archives, chc = Cuban Heritage Collection.

Collection – four-digit sequence which identifies the larger collection to which the item belongs, such as a manuscript collection. The collection number combined with the repository code uniquely identifies each digital collection.

For example, asm0341 is the code for the Pan American World Airways collection in Special Collections, and chc9998 represents the Periodicals collection in the Cuban Heritage Collection.

Object – six-digit identifier assigned sequentially to each distinct bibliographic or intellectually discreet item. For example, a book or an archival folder has many pages, but it is one object, and therefore has one object number.

Because none of these collections contains more than 10,000 items, the object number will always begin with at least one zero.

Sequence – four-digit identifier assigned sequentially to each distinct page, leaf, side, or view of an object. The order of the sequence number corresponds to the order of the pages in the original object. For example, object chc9998000301 is a volume of a newspaper, with many pages. The first page would be assigned sequence 1 (chc99980003010001…), the second page would be sequence 2 (chc99980003010002…), and so on.

Because no object in these collections has more than 1,000 pages, the sequence number will always begin with at least one zero.

Detail/Format – three-digit sequence indicating a more specific view of an image, or a file format different from the archival standard. For all items provided here, the detail/format number will be “001”.

Example: asm03410002100016001

Repository:	_asm_03410002100016001 (Original object housed at UM Special Collections) 
Collection:	asm_0341_0002100016001 (Part of collection ASM0341, Pan American World Airways Collection) 
Object:		asm0341_000210_0016001 (Object number 210 within this collection) 
Sequence:	asm0341000210_0016_001 (Page 16 within this object) 
Detail/Format:	asm03410002100016_001_ (Detail/format is always 001)

If you have questions or feedback about this dataset and/or the way that it has been made available, please let us know. This is part of an on-going project to release our content as Collections as Data, and we appreciate feedback that might shape our practices and workflows. This is a project of the UM Libraries Digital Strategies Department (https://www.library.miami.edu/departments/digital-strategies.html).


