pipeline {
  agent any
  stages {
    stage('Buzz Build') {
      steps {
        sh '''echo I am a $BUZZ_NAME






./jenkins/build.sh'''
        archiveArtifacts(artifacts: 'target/*.jar', fingerprint: true)
      }
    }
    stage('Buzz Test') {
      steps {
        sh './jenkins/test-all.sh'
      }
    }
  }
  environment {
    BUZZ_NAME = 'Worker Bee'
  }
}