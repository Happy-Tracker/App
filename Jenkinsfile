pipeline {
  agent any
  stages {
    stage('Buzz Buzz') {
      steps {
        echo 'Bees Buzz!'
      }
    }
    stage('Bees Bees') {
      parallel {
        stage('Bees Bees') {
          steps {
            echo 'Buzz Bees Buzz!'
            echo 'Bees Buzzing!'
          }
        }
        stage('testing B') {
          steps {
            sh '''sleep 10
echo done.'''
          }
        }
      }
    }
  }
}