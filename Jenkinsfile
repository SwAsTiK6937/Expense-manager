pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning Repo...'
            }
        }

        stage('Build') {
            steps {
                sh '''
                echo "Running Expense Manager Build"
                ls
                echo "Build Successful"
                '''
            }
        }
    }
}
