pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('github-jenks-cred')
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
                    dockerImage = docker.build("charu325/node-app")
                }
            }
        }
        stage('Test') {
            steps {
                bat 'npm install'
                bat 'npm test'
            }
        }
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('', charu325) {
                        dockerImage.push("latest")
                    }
                }
            }
        }
        stage('Deploy to Blue') {
            steps {
                script {
                    bat 'docker run -d -p 3001:3000 --name=blue charu325/node-app:latest'
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
                    bat 'docker run -d -p 3002:3000 --name=green charu325/node-app:latest'
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