# 🚀 Complete Setup Guide - HCP CRM AI Project

Follow these steps **exactly in order** to run the project.

---

## 📋 PREREQUISITES (Before Starting)

Check if you have these installed:

### 1. **Python**
Open PowerShell and type:
```
python --version
```
Should show: `Python 3.10+`

If NOT installed:
- Download from: https://www.python.org/downloads/
- Click "Add Python to PATH" during installation

### 2. **Node.js and npm**
Open PowerShell and type:
```
node --version
npm --version
```
Should show versions

If NOT installed:
- Download from: https://nodejs.org/
- Install latest LTS version

### 3. **Git**
Open PowerShell and type:
```
git --version
```
Should show a version

If NOT installed:
- Download from: https://git-scm.com/

---

## 🔧 COMPLETE SETUP STEPS

### **STEP 1: Open PowerShell**

Press `Windows Key + R`
Type: `powershell`
Press Enter

---

### **STEP 2: Navigate to Backend Folder**

Copy and paste this:
```
cd C:\Users\saksh\Documents\hcp-crm-ai\backend
```

Press Enter

You should see:
```
PS C:\Users\saksh\Documents\hcp-crm-ai\backend>
```

---

### **STEP 3: Create Virtual Environment**

Copy and paste this:
```
python -m venv venv
```

Press Enter

Wait 1-2 minutes for it to finish.

You should see a `venv` folder appear in `C:\Users\saksh\Documents\hcp-crm-ai\backend\`

---

### **STEP 4: Activate Virtual Environment**

Copy and paste this:
```
venv\Scripts\activate
```

Press Enter

You should see:
```
(venv) PS C:\Users\saksh\Documents\hcp-crm-ai\backend>
```

Notice the `(venv)` at the beginning - this means it's activated ✅

---

### **STEP 5: Install Python Packages**

Copy and paste this:
```
pip install -r requirements.txt
```

Press Enter

Wait 2-3 minutes for all packages to install.

You should see:
```
Successfully installed Django-4.2 djangorestframework-3.14.0 ...
```

---

### **STEP 6: Create Environment Configuration File**

Copy and paste this:
```
copy .env.example .env
```

Press Enter

You should see:
```
1 file(s) copied.
```

---

### **STEP 7: Edit the .env File**

Copy and paste this:
```
notepad .env
```

Press Enter

A Notepad window will open.

You should see:
```
GROQ_API_KEY=your-groq-api-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

**Replace** `your-groq-api-key-here` with:
1. Go to: https://console.groq.com
2. Sign up or login
3. Create API key
4. Copy the key
5. Paste it in Notepad where it says `your-groq-api-key-here`

Example after editing:
```
GROQ_API_KEY=gsk_abcd1234efgh5678ijkl9012
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

**Save the file:**
- Press `Ctrl + S`
- Close Notepad

---

### **STEP 8: Create Database**

Back in PowerShell, copy and paste:
```
python manage.py migrate
```

Press Enter

Wait 1 minute.

You should see:
```
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, interactions, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  ...
```

A `db.sqlite3` file will be created ✅

---

## ✅ SETUP COMPLETE!

You have successfully set up the backend!

Now follow the **RUNNING THE PROJECT** section below.

---

# 🎮 RUNNING THE PROJECT

Do these steps **every time** you want to use the app.

### **TERMINAL 1 - Start Backend Server**

**Step 1:** Open PowerShell

**Step 2:** Navigate to backend:
```
cd C:\Users\saksh\Documents\hcp-crm-ai\backend
```

**Step 3:** Activate virtual environment:
```
venv\Scripts\activate
```

**Step 4:** Start Django server:
```
python manage.py runserver
```

**Wait for this message:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

✅ **Leave this terminal OPEN and RUNNING!**

---

### **TERMINAL 2 - Start Frontend Server**

**Step 1:** Open a NEW PowerShell window (don't close the first one)

**Step 2:** Navigate to frontend:
```
cd C:\Users\saksh\Documents\hcp-crm-ai\frontend
```

**Step 3:** Start React server:
```
npm start
```

**Wait for this message:**
```
Compiled successfully!

You can now view hcp-crm-frontend in the browser.

Local:            http://localhost:3000
On Your Network:  http://192.168.29.202:3000
```

✅ **A browser window should automatically open!**

---

### **STEP 3: Use the Application**

**Your browser should show:**
```
http://localhost:3000
```

You should see:
- Purple/gradient background
- "HCP Interaction Logger" title
- Two buttons: "📋 Structured Form" and "💬 Chat Mode"

✅ **The app is running!**

---

## 🧪 TEST IT

### **Test 1: Log an Interaction (Form Mode)**

1. Click "📋 Structured Form" button
2. Fill in:
   - HCP Name: `Dr. Ahmed`
   - Specialty: `Cardiology`
   - Interaction Type: `Meeting`
   - Date: Today's date
   - Duration: `45`
   - Add Discussion Point: `Blood pressure management`
   - Add Product: `Heart Medication`
   - Outcome: `Positive`
3. Click "Log Interaction" button
4. Should see: ✅ "Interaction logged successfully!"

---

### **Test 2: Check Backend API**

1. Open new browser tab
2. Go to: `http://localhost:8000/api/interactions/`
3. Should see the interaction you just logged as JSON

---

### **Test 3: Chat Mode**

1. Go back to: `http://localhost:3000`
2. Click "💬 Chat Mode" button (should be enabled now)
3. Type: "Tell me more about this HCP"
4. Click Send
5. AI should respond

---

## 🛑 STOPPING THE APP

### **When done:**

**Terminal 1 (Backend):**
- Press: `Ctrl + C`
- Type: `Y`
- Press Enter

**Terminal 2 (Frontend):**
- Press: `Ctrl + C`
- Type: `Y`
- Press Enter

---

## ⚡ QUICK REFERENCE

### **Every Time You Want to Use the App:**

**Terminal 1:**
```
cd C:\Users\saksh\Documents\hcp-crm-ai\backend
venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 (New Window):**
```
cd C:\Users\saksh\Documents\hcp-crm-ai\frontend
npm start
```

**Browser:**
```
http://localhost:3000
```

---

## ❌ TROUBLESHOOTING

### **Problem: `(venv) not showing`**
**Solution:** Run this again:
```
venv\Scripts\activate
```

### **Problem: `Module not found: django`**
**Solution:** Run this again:
```
pip install -r requirements.txt
```

### **Problem: `Port 3000 already in use`**
**Solution:** Use different port:
```
npm start -- --port 3001
```
Then go to: `http://localhost:3001`

### **Problem: `Port 8000 already in use`**
**Solution:** Use different port:
```
python manage.py runserver 8001
```

### **Problem: `GROQ_API_KEY not found`**
**Solution:** Edit `.env` file:
```
notepad C:\Users\saksh\Documents\hcp-crm-ai\backend\.env
```
Add your Groq API key from: https://console.groq.com

### **Problem: npm command not found**
**Solution:** Install Node.js from: https://nodejs.org/

### **Problem: python command not found**
**Solution:** Install Python from: https://www.python.org/downloads/
Make sure to check "Add Python to PATH"

---

## 📱 ACCESSING THE APP

| Service | URL |
|---------|-----|
| **Frontend (Main App)** | http://localhost:3000 |
| **Backend API** | http://localhost:8000 |
| **API Interactions** | http://localhost:8000/api/interactions/ |
| **Django Admin** | http://localhost:8000/admin |

---

## ✅ FINAL CHECKLIST

Before running, verify:

- [ ] Python installed (`python --version`)
- [ ] Node.js installed (`node --version`)
- [ ] Virtual environment created (`venv` folder exists)
- [ ] Packages installed (no errors in pip install)
- [ ] `.env` file created with GROQ_API_KEY
- [ ] Database migrations ran (db.sqlite3 exists)
- [ ] Both terminals ready (backend + frontend)

---

## 🎓 WHAT EACH COMMAND DOES

| Command | What it does |
|---------|-------------|
| `python -m venv venv` | Creates isolated Python environment |
| `venv\Scripts\activate` | Activates the environment |
| `pip install -r requirements.txt` | Installs Django, API tools, AI library |
| `copy .env.example .env` | Creates configuration file |
| `python manage.py migrate` | Creates database tables |
| `python manage.py runserver` | Starts Django backend server |
| `npm start` | Starts React frontend server |

---

## 🚀 YOU'RE ALL SET!

Follow these steps and the project will be running perfectly! 

If you get stuck, check the **TROUBLESHOOTING** section above.

Good luck! 🎉
