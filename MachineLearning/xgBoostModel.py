import xgboost as xgb
import pandas as pd

df = pd.read_csv('Cleaned_Data.csv').sort_index()

data = df.loc[:, df.columns != 'match']
labels = df['match']

from sklearn.model_selection import train_test_split

X_train, X_test, Y_train, Y_test = train_test_split(data, labels, test_size=0.2)

D_train = xgb.DMatrix(X_train, label=Y_train)
D_test = xgb.DMatrix(X_test, label=Y_test)

param = {
    'eta': 0.3, 
    'max_depth': 3,  
    'objective': 'multi:softprob',  
    'num_class': 2} 

steps = 20

model = xgb.train(param, D_train, steps)

import numpy as np
from sklearn.metrics import precision_score, recall_score, accuracy_score

preds = model.predict(D_test)
best_preds = np.asarray([np.argmax(line) for line in preds])

print("Precision = {}".format(precision_score(Y_test, best_preds, average='macro')))
print("Recall = {}".format(recall_score(Y_test, best_preds, average='macro')))
print("Accuracy = {}".format(accuracy_score(Y_test, best_preds)))

from sklearn.model_selection import GridSearchCV

clf = xgb.XGBClassifier()
parameters = {
     "eta"    : [0.05, 0.3, 0.6] ,
     "max_depth"        : [ 3, 8, 10, 15],
     "min_child_weight" : [ 1, 7 ],
     "gamma"            : [ 0.0, 0.2, 0.4 ],
     "colsample_bytree" : [ 0.3 ]
     }

grid = GridSearchCV(clf,
                    parameters, n_jobs=4,
                    scoring="accuracy",
                    cv=3)

grid.fit(X_train, Y_train)

print(grid.best_params_)
print(grid.score(X_test, Y_test))