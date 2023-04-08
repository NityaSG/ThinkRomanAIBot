from sklearn.naive_bayes import MultinomialNB
import numpy as np

def naive_bayes_classifier(color, type, origin, stolen):
    X = np.array([
        ['red', 'sports', 'domestic', 'yes'],
        ['red', 'sports', 'domestic', 'no'],
        ['red', 'sports', 'imported', 'yes'],
        ['yellow', 'sports', 'imported', 'no'],
        ['yellow', 'suv', 'imported', 'yes'],
        ['yellow', 'suv', 'domestic', 'no'],
        ['yellow', 'suv', 'domestic', 'yes'],
        ['red', 'sports', 'imported', 'no'],
        ['red', 'suv', 'domestic', 'yes'],
        ['yellow', 'sports', 'imported', 'yes']
    ])
    y = np.array(['yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'yes'])
    clf = MultinomialNB()
    clf.fit(X, y)
    X_test = np.array([[color, type, origin, stolen]])
    y_pred = clf.predict(X_test)
    
    return y_pred[0]
