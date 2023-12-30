pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                 sh '''
                    git config --global http.version HTTP/1.1
                    git config --global core.compression 0
                    git config --global http.postBuffer 524288000
                '''
                checkout scmGit(branches: [[name: '*/dockerize']], extensions: [], userRemoteConfigs: [[credentialsId: 'git-token', url: 'https://github.com/YoussefAlsaeed/Clinic-Reservation-System.git']])

            }
        }
        stage('Build db docker image'){
            steps{
                script{
                    sh 'docker build -t youssefalsaaed/clinic-db .'
                }
            }
            
        }
        stage('Run locally in container'){
            steps{
                script{
                    
                    sh 'docker network create app-api'
                    sh 'docker network create app-ui'
                    sh 'docker volume create db-vol'
                    sh 'docker run --rm -p 3307:3307 -e MYSQL_TCP_PORT=3307 -e MYSQL_ROOT_USERNAME=root -e MYSQL_ROOT_PASSWORD=Passw@rd -v db-vol:/var/lib/mysql --name mysqldb --net app-api -d youssefalsaaed/clinic-db'
                }
            }
        }
        stage('Push image to Dockerhub'){
            steps{
                script{
                   withCredentials([string(credentialsId: 'docker-pwd', variable: 'docker-pwd')]) {
                   sh 'docker login -u youssefalsaaed -p ${docker-pwd}'}
                   
                   sh 'docker push youssefalsaaed/clinic-db'
                }
            }
        }
    }
}
