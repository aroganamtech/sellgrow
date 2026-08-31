import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

base_url = "https://www.georgemaijoagri.com/catalogues"
output_dir = r"C:\Users\Naveen S\OneDrive\Desktop\SellGrow_Main\SellGrow_Web\sellgrow\brochure_ai_model\PDF"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

try:
    response = requests.get(base_url, timeout=10)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    pdf_links = list(set([
        urljoin(base_url, a["href"]) 
        for a in soup.find_all("a", href=True) 
        if a["href"].lower().endswith(".pdf")
    ]))

    print(f"Found {len(pdf_links)} PDF brochure(s).")

    for pdf_url in pdf_links:
        pdf_name = pdf_url.split("/")[-1].split("?")[0]
        file_path = os.path.join(output_dir, pdf_name)
        
        try:
            res = requests.get(pdf_url, stream=True, timeout=15)
            res.raise_for_status()
            
            with open(file_path, "wb") as f:
                for chunk in res.iter_content(chunk_size=8192):
                    f.write(chunk)
                    
            print(f"Downloaded: {pdf_name}")
            
        except Exception as err:
            print(f"Failed to download {pdf_name}: {err}")

except Exception as err:
    print(f"Error accessing webpage: {err}")