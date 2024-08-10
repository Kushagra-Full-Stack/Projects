import speech_recognition as sr
import webbrowser
import pyttsx3
import requests
import musiclibrary  # Assuming this is your custom module for music library

print ("top open jarvis call his name `jarvis` ")
print ("first command is open google")
print ("second command is open youtube ")
print ("tell me a joke")

WAKE_WORD = "jarvis"

recognizer = sr.Recognizer()
engine = pyttsx3.init()

def speak(text):
    """Speaks the given text using the text-to-speech engine."""
    engine.say(text)
    engine.runAndWait()

def get_audio():
    """Obtains audio input from the microphone with a timeout and phrase time limit."""
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source, timeout=3, phrase_time_limit=5)
    return audio

def process_command(command):
    """Processes the user's spoken command and performs actions accordingly."""
    command = command.lower()

    if "open google" in command:
        speak("Opening Google")
        webbrowser.open("https://google.com")
    elif "open facebook" in command:
        speak("Opening Facebook")
        webbrowser.open("https://facebook.com")
    elif "open youtube" in command:
        speak("Opening YouTube")
        webbrowser.open("https://youtube.com")
    elif command.startswith("play"):
        parts = command.split(" ", 1)
        if len(parts) > 1:
            song = parts[1]
            link = musiclibrary.music.get(song)
            if link:  # Check if song exists in the music library
                speak("Playing " + song)
                webbrowser.open(link)
            else:
                speak("Sorry, " + song + " is not available in your music library.")
        else:
            speak("Please specify the song name after 'play'.")
    elif "tell me a joke" in command:
        joke_url = "https://icanhazdadjoke.com/"
        response = requests.get(joke_url, headers={"Accept": "application/json"})
        joke = response.json().get("joke")
        if joke:
            speak(joke)
        else:
            speak("I couldn't find any jokes at this time.")
    elif "what is the weather like" in command:
        weather_url = "https://api.openweathermap.org/data/2.5/weather?q=your_city&appid=your_api_key"
        response = requests.get(weather_url)
        weather_data = response.json()
        if weather_data:
            temperature = weather_data.get("main").get("temp")
            description = weather_data.get("weather")[0].get("description")
            speak(f"The weather is currently {description} with a temperature of {temperature} Kelvin.")  # Adjust units as needed
        else:
            speak("I couldn't find any weather information.")
    # Add more functionalities here (e.g., setting reminders, taking notes)
    else:
        speak("Sorry, I don't understand your command yet. How can I improve?")

if __name__ == "__main__":
    speak("Initializing JARVIS...")
    while True:
        try:
            audio = get_audio()
            command = recognizer.recognize_google(audio).lower()
            if WAKE_WORD in command:
                speak("Yes")
                audio = get_audio()
                command = recognizer.recognize_google(audio).lower()
                process_command(command)
        except sr.UnknownValueError:
            pass  # Do nothing if the speech is not recognized
        except sr.RequestError as e:
            speak("Could not request results from Google Speech Recognition service; {0}".format(e))
        except Exception as e:
            speak(f"An error occurred: {e}")
