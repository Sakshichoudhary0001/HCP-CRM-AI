cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
echo "Add GROQ_API_KEY to .env file from https://console.groq.com"
python manage.py migrate
python manage.py runserver
