# ⚡ QUICK START - HCP CRM AI

## 🎯 First Time Setup (30 minutes)

```
1. Open PowerShell
2. cd C:\Users\saksh\Documents\hcp-crm-ai\backend
3. python -m venv venv
4. venv\Scripts\activate
5. pip install -r requirements.txt
6. copy .env.example .env
7. notepad .env
   (Add GROQ_API_KEY from https://console.groq.com)
8. python manage.py migrate
```

✅ Setup done!

---

## 🚀 Run the Project (Every Time)

### Terminal 1:
```
cd C:\Users\saksh\Documents\hcp-crm-ai\backend
venv\Scripts\activate
python manage.py runserver
```

### Terminal 2 (New Window):
```
cd C:\Users\saksh\Documents\hcp-crm-ai\frontend
npm start
```

### Browser:
```
http://localhost:3000
```

---

## 📍 Key URLs

- **App:** http://localhost:3000
- **Backend:** http://localhost:8000
- **API:** http://localhost:8000/api/interactions/
- **Admin:** http://localhost:8000/admin
- **Groq API:** https://console.groq.com

---

## ❌ Quick Fixes

| Issue | Fix |
|-------|-----|
| `(venv) not showing` | `venv\Scripts\activate` |
| `Module not found` | `pip install -r requirements.txt` |
| `Port 3000 used` | `npm start -- --port 3001` |
| `Port 8000 used` | `python manage.py runserver 8001` |
| `No GROQ_API_KEY` | Add to `.env` file and restart |

---

## 📖 Full Guide

See: **SETUP_GUIDE.md** in the project root

---

**Read SETUP_GUIDE.md for detailed step-by-step instructions!**
