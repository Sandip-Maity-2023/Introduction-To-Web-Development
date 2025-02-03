# Disease Priority Scoring System

# Step 1: Define a dictionary mapping diseases to priority scores
disease_priority = {
    "heart attack": 10,
    "stroke": 9,
    "cancer": 8,
    "severe infection": 8,
    "diabetes": 5,
    "asthma": 6,
    "fracture": 7,
    "migraine": 3,
    "flu": 2,
    "cold": 1,
    "pneumonia": 7,
    "tuberculosis": 6,
    "kidney failure": 9,
    "liver disease": 7,
    "appendicitis": 8,
    "unknown": 4  # Default score for unknown diseases
}

# Step 2: Function to get priority score based on disease name
def get_priority_score(disease_name):
    """
    Returns a priority score for a given disease.
    If the disease is not in the dictionary, returns a default score.
    """
    disease_name = disease_name.lower().strip()  # Normalize input (remove spaces, convert to lowercase)
    return disease_priority.get(disease_name, disease_priority["unknown"])

# Step 3: Get user input and display the result
if __name__ == "__main__":
    disease = input("Enter disease name: ")
    score = get_priority_score(disease)
    print(f"Priority score for '{disease}': {score}")
