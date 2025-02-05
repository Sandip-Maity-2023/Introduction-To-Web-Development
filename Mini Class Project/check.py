# Disease Priority Scoring System

# Step 1: Define a dictionary mapping diseases to priority scores
disease_priority = {
    "heart attack": 10,
    "stroke": 90,
    "cancer": 80,
    "severe infection": 70,
    "diabetes": 50,
    "asthma": 60,
    "fracture": 70,
    "migraine": 30,
    "flu": 20,
    "cold": 10,
    "pneumonia": 70,
    "tuberculosis": 60,
    "kidney failure": 90,
    "liver disease": 70,
    "appendicitis": 80,
    "unknown": 40  # Default score for unknown diseases
}

# Step 2: Function to get priority score based on disease name
def get_priority_score(disease_name):
    disease_name = disease_name.lower().strip()  # Normalize input
    return disease_priority.get(disease_name, disease_priority["unknown"])  # Default if not found

# Step 3: Function to handle user input and display the priority score
def check_priority():
    disease_input = input("Enter the disease name: ").strip()

    if not disease_input:
        print("Please enter a disease name!")
        return

    score = get_priority_score(disease_input)
    print(f'Priority Score for "{disease_input}": {score}')

# Run the function to check priority score
check_priority()
