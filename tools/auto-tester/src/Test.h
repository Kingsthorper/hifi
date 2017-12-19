//
//  Test.h
//  zone/ambientLightInheritence
//
//  Created by Nissim Hadar on 2 Nov 2017.
//  Copyright 2013 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

#ifndef hifi_test_h
#define hifi_test_h

#include <QtWidgets/QFileDialog>
#include <QtWidgets/QMessageBox>
#include <QtCore/QRegularExpression>

#include "ImageComparer.h"
#include "ui/MismatchWindow.h"

class Test {
public: 
    Test();

    void evaluateTests(bool interactiveMode);
    void evaluateTestsRecursively(bool interactiveMode);
    void createRecursiveScript();
    void createTest();

    QStringList createListOfAllJPEGimagesInDirectory(QString pathToImageDirectory);

    bool isInSnapshotFilenameFormat(QString filename);
    bool isInExpectedImageFilenameFormat(QString filename);

    void importTest(QTextStream& textStream, const QString& testPathname, int testNumber);

    void appendTestResultsToFile(QString testResultsFolderPath, TestFailure testFailure, QPixmap comparisonImage);

    bool createTestResultsFolderPathIfNeeded(QString directory);
    void zipAndDeleteTestResultsFolder();

private:
    const QString TEST_FILENAME { "test.js" };
    const QString TEST_RESULTS_FOLDER { "TestResults" };
    const QString TEST_RESULTS_FILENAME { "TestResults.txt" };

    QMessageBox messageBox;

    QDir imageDirectory;

    QRegularExpression snapshotFilenameFormat;
    QRegularExpression expectedImageFilenameFormat;

    MismatchWindow mismatchWindow;

    ImageComparer imageComparer;

    bool compareImageLists(QStringList expectedImages, QStringList resultImages, QString testDirectory, bool interactiveMode);

    QString testResultsFolderPath { "" };
    int index { 1 };
};

#endif // hifi_test_h
