pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-credentials')
        //PATH = "home/snucse/.nvm/versions/node/v22.11.0/bin/npm"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    //bat 'docker build -t charu325/node-app:latest Dockerfile'
                    bat 'docker build -t charu325/node-app:latest .'
                    dockerImage = docker.build('charu325/node-app:latest')
                    
                }
            }
        }
        stage('Test') {
            steps {
                //sh 'sudo /usr/bin/npm install' 
                //sh '/usr/bin/npm test'
                //bat 'npm install'
                //bat 'npm test'
                echo 'testing.....'
            }
        }
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('','docker-hub-credentials') {
                        dockerImage.push('latest')
                    }
                }
            }
        }
        stage('Deploy to Blue') {
            steps {
                script {
                    bat '''
                    docker stop blue || exit 0
                    docker rm blue || exit 0
                    docker run -d -p 3001:3000 --name=blue charu325/node-app:latest
                    '''
                }
            }
        }
        stage('Test Blue Deployment') {
            steps {
                script {
                    // Add your test steps here, e.g., health checks
                    echo 'Testing Blue Deployment...'
                }
            }
        }
        stage('Deploy to Green') {
            steps {
                script {
                   bat '''
                    docker stop green || exit 0
                    docker rm green || exit 0
                    docker run -d -p 3002:3000 --name=green charu325/node-app:latest
                    '''
                }
            }
        }
        stage('Switch Traffic to Green') {
            steps {
                script {
                    // Update load balancer to point to green
                    echo 'Switching traffic to Green Deployment...'
                }
            }
        }
        stage('Stop Blue') {
            steps {
                script {
                    bat 'docker stop blue && docker rm blue'
                }
            }
        }
    }
}
