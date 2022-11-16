import pandas as pd

df = pd.read_csv("Speed Dating Data.csv", encoding="ISO-8859-1")

# Features of Interest

# iid - ID of Primary Participant
# gender - Gender of Primary Participant
# pid - ID of Partner
# match - 1 if the participants matched 0 otherwise (Label for Data)
# samerace - 1 if participants are of the same race
# age_o - Age of Partner
# age - Age of Participant
# field_cd - Field of Study of Participant (coded)
    # Field Codes
    # 1= Law  
    # 2= Math
    # 3= Social Science, Psychologist 
    # 4= Medical Science, Pharmaceuticals, and Bio Tech 
    # 5= Engineering  
    # 6= English/Creative Writing/ Journalism 
    # 7= History/Religion/Philosophy 
    # 8= Business/Econ/Finance 
    # 9= Education, Academia 
    # 10= Biological Sciences/Chemistry/Physics
    # 11= Social Work 
    # 12= Undergrad/undecided 
    # 13=Political Science/International Affairs 
    # 14=Film
    # 15=Fine Arts/Arts Administration
    # 16=Languages
    # 17=Architecture
    # 18=Other
# undergrd - School attended for undergraduate for Participant
# imprace - How Important it is for participant to have partner of same race
# imprelig - How Important it is for participant to have partner of the same religion 
# from - Where the Participant is from originally
# go_out - How often does the Participant go out?
    # Categories
    #   Several times a week=1
    # 	Twice a week=2
    # 	Once a week=3
    # 	Twice a month=4
    # 	Once a month=5
    # 	Several times a year=6
    # 	Almost never=7

# career_c - Participant Intended Career (encoded)
    # career_c Codes
    #     1= Lawyer 
    #     2= Academic/Research 
    #     3= Psychologist 
    #     4= Doctor/Medicine 
    #     5=Engineer 
    #     6= Creative Arts/Entertainment 
    #     7= Banking/Consulting/Finance/Marketing/Business/CEO/Entrepreneur/Admin 
    #     8= Real Estate 
    #     9= International/Humanitarian Affairs 
    #     10= Undecided 
    #     11=Social Work
    #     12=Speech Pathology
    #     13=Politics
    #     14=Pro sports/Athletics
    #     15=Other
    #     16=Journalism
    #     17=Architecture

# Interests (Scale of 1 - 10) of Participant

# sports: Playing sports/ athletics
# tvsports: Watching sports
# exercise: Body building/exercising
# dining: Dining out
# museums: Museums/galleries
# art: Art
# hiking:  Hiking/camping
# gaming: Gaming
# clubbing: Dancing/clubbing
# reading: Reading
# tv: Watching TV
# theater: Theater
# movies: Movies
# concerts: Going to concerts
# music: Music
# shopping: Shopping
# yoga: Yoga/meditation



features_of_interest = ['iid', 'gender', 'pid', 'match', 'samerace',
                        'field_cd', 'undergra', 'imprace', 'imprelig', 'from', 
                        'go_out', 'career_c', 'sports', 'tvsports', 'exercise',
                        'dining', 'museums', 'art', 'hiking', 'gaming', 'clubbing',
                        'reading', 'tv', 'theater', 'movies', 'concerts', 'music',
                        'shopping', 'yoga']

filtered_df = df[features_of_interest]
print((filtered_df.isna().sum() / len(df)) * 100)

filtered_df = filtered_df.dropna()
print(f"Removed {(len(df) - len(filtered_df))/len(df) * 100}% rows ({len(df)- len(filtered_df)} rows removed)")
print(f'Remaining Rows: {len(filtered_df)}')

def joinDataframeOnPID(df):
    features_of_interest_p = ['iid',
                        'field_cd', 'undergra', 'imprace', 'imprelig', 'from', 
                        'go_out', 'career_c', 'sports', 'tvsports', 'exercise',
                        'dining', 'museums', 'art', 'hiking', 'gaming', 'clubbing',
                        'reading', 'tv', 'theater', 'movies', 'concerts', 'music',
                        'shopping', 'yoga']
    df_filtered_p = df[features_of_interest_p].rename({'iid': 'pid'}, axis = 1).drop_duplicates()
    df_merged = pd.merge(df, df_filtered_p, how='outer', on = 'pid', suffixes = [None, '_p'])
    for hobby in ['sports', 'tvsports', 'exercise',
                  'dining', 'museums', 'art', 'hiking', 'gaming', 'clubbing',
                  'reading', 'tv', 'theater', 'movies', 'concerts', 'music',
                  'shopping', 'yoga']:
        df_merged[hobby+"_difference"] = (df_merged['sports'] - df_merged['sports_p']).abs()
    df_merged['from'] = df_merged['from'].str.lower()
    df_merged["same_from"] = df_merged['from'] == df_merged['from_p']
    df_merged["same_undergra"] = df_merged['undergra'] == df_merged['undergra_p']
    df_merged["same_career"] = df_merged['career_c'] == df_merged['career_c_p']
    df_merged["same_field"] = df_merged['field_cd'] == df_merged['field_cd_p']



    def standardizeFrom(x):
        newYorkCityVariations = ['new york', 'brooklyn, ny', 'i am from nyc', 'new york city', 'nyc', 'brooklyn', 'manhattan', 'bronx science', 'nyc, san francisco', 'new york, ny']
        if x in newYorkCityVariations:
            return 'nyc, new york'
        upperNewYorkVariations = ['saratoga, ny', 'hastings-on-hudson, ny', 'katonah, ny (more recently, boston)', 'buffalo, ny', 'westchester, new york', 'great neck, ny', 'westchester county, n.y.', 'upstate new york']
        if x in upperNewYorkVariations:
            return 'upstate new york'
        LAVariations = ['los angeles', 'los angeles, ca', 'hawaii and los angeles']
        if x in LAVariations:
            return 'los angeles, california'
        bayAreaVariations = ['northern california', 'san francisco/la', 'santa barbara, california', 'san francisco', 'palo alto, ca', 'san francisco, ca', 'san francisco bay area']
        if x in bayAreaVariations:
            return 'bay area, california'
        southCaliforniaVariations = ['san diego', 'california', 'california (west coast)', 'california and new york', 'southern california', ]
        if x in southCaliforniaVariations:
            return 'southern california'
        massachussettsVariations = ['boston, ma', 'boston', 'cambridge, massachusetts', 'cambridge, ma']
        if x in massachussettsVariations:
            return 'massachussetts'
        pennsylvaniaVariations = ['new hope, pa', 'philadelphia', 'pennsylvania', 'erie, pa', 'pittsburgh, pa']
        if x in pennsylvaniaVariations:
            return 'pennsylvania'
        newJerseyVariations = ['born in montana, raised in south jersey (nr. philadelphia)', 'new jersey', 'northern new jersey', 'nj', 'california, new jersey']
        if x in newJerseyVariations:
            return 'new jersey'
        return x
    df_merged['from'] = df_merged['from'].apply(standardizeFrom).astype('category').cat.codes
    df_merged['from_p'] = df_merged['from_p'].apply(standardizeFrom).astype('category').cat.codes

    df_merged['undergra'] = df_merged['undergra'].astype('category').cat.codes
    df_merged['undergra_p'] = df_merged['undergra_p'].astype('category').cat.codes

    return df_merged

df = joinDataframeOnPID(filtered_df)
df.to_csv("Cleaned_Data.csv")
df.corr().to_csv('Correlations.csv')
print(df['same_from'].sum())
print(df[df['same_from'] == True])
print(df['same_undergra'].sum())
print(df[df['same_undergra'] == True])
