import xgboost as xgb
import pandas as pd
from mlxtend.feature_selection import SequentialFeatureSelector as SFS
from sklearn.metrics import precision_score, recall_score, accuracy_score
from sklearn.model_selection import GridSearchCV
import matplotlib.pyplot as plt

df = pd.read_csv('Cleaned_Data.csv')
print("Before Removing: ", str(len(df.columns)))
removeColumns = ["from","same_from", "imprace", "imprelig", "samerace",  'p_iid', 'p_pid', 'imprace_p', 'imprelig_p', 'go_out_p', 'career_c_p', 'sports_p', 'tvsports_p', 'dining_p', 'museums_p', 'art_p', 'hiking_p', 'gaming_p', 'clubbing_p', 'reading_p', 'tv_p', 'theater_p', 'movies_p', 'concerts_p', 'music_p', 'shopping_p', 'yoga_p', 'iid', 'gender', 'field_cd', 'go_out', 'career_c', 'tvsports', 'dining', 'art', 'hiking', 'gaming', 'clubbing', 'tv', 'movies', 'concerts', 'music', 'shopping', 'yoga', 'sports', 'exercise', 'museums', 'reading', 'theater', 'field_cd_p', 'from_p', 'exercise_p']
df = df.drop(columns=removeColumns)
print("After Removing: ", str(len(df.columns)))

data = df.loc[:, df.columns != 'match']
print(df.columns)
labels = df['match']

from sklearn.model_selection import train_test_split

X_train, X_test, Y_train, Y_test = train_test_split(data, labels, test_size=0.2, random_state=21)

clf = xgb.XGBClassifier()
parameters = {
     "eta"    : [0.1, 0.2, 0.25, 0.3] ,
     "max_depth"        : [2 ,3, 8, 10, 15, 20],
     "min_child_weight" : [0.1, 0.5, 0.8 ,1, 7, 10 ],
     'objective': ['binary:logistic', 'binary:hinge']
     }
accuracies = []
for eta in [x/100 for x in range(1,30)]:
     model = xgb.XGBClassifier(eta=eta)
     model.fit(X_train, Y_train)
     accuracies.append(model.score(X_test,Y_test))

plt.plot([x/100 for x in range(1,30)], y=accuracies)
plt.plot()


grid = GridSearchCV(clf,
                    parameters, n_jobs=4,
                    scoring="accuracy",
                    cv=3)

grid.fit(X_train, Y_train)
best = grid.best_estimator_
best_preds = best.predict(X_test)
print(grid.best_params_)

print("Precision = {}".format(precision_score(Y_test, best_preds, average='macro')))
print("Recall = {}".format(recall_score(Y_test, best_preds, average='macro')))
print("Accuracy = {}".format(accuracy_score(Y_test, best_preds)))

multiclassModel = xgb.XGBClassifier()

parameters = {
     "eta"    : [0.1, 0.2, 0.25, 0.3] ,
     "max_depth"        : [2 ,3, 8, 10, 15, 20],
     "min_child_weight" : [ 1, 7, 10 ],
     'objective': ['multi:softmax'],
     'num_class': [2]
     }

grid = GridSearchCV(multiclassModel,
                    parameters, n_jobs=4,
                    scoring="accuracy",
                    cv=3)

grid.fit(X_train, Y_train)
best = grid.best_estimator_
best_preds = best.predict(X_test)
print("Multiclass Best params: ", grid.best_params_)
print("Multiclass Precision = {}".format(precision_score(Y_test, best_preds, average='macro')))
print("Multiclass Recall = {}".format(recall_score(Y_test, best_preds, average='macro')))
print("Multiclass Accuracy = {}".format(accuracy_score(Y_test, best_preds)))
# sfs = SFS(best, forward = True, k_features = 'best', n_jobs = -1)
# sfs.fit(X_train, Y_train)
# features = list(sfs.k_feature_names_)
# best.fit(X_train[features], Y_train)
# best_preds = best.predict(X_test[features])
# print(features)
# print("Feature Selected Multiclass Best params: ", grid.best_params_)
# print("Feature Selected Multiclass Precision = {}".format(precision_score(Y_test, best_preds, average='macro')))
# print("Feature Selected Multiclass Recall = {}".format(recall_score(Y_test, best_preds, average='macro')))
# print("Feature Selected Multiclass Accuracy = {}".format(accuracy_score(Y_test, best_preds)))