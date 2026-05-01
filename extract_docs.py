import sys
import docx
import PyPDF2

def extract_docx(filepath):
    try:
        doc = docx.Document(filepath)
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        return str(e)

def extract_pdf(filepath):
    try:
        reader = PyPDF2.PdfReader(filepath)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    print("--- DOCX ---")
    print(extract_docx("UMAY .docx")[:1500])
    print("\n--- PDF ---")
    print(extract_pdf("UMAY_Devasa_Muhendislik_Raporu.pdf")[:1500])
