node {
    
    environment {
        SLACK_CHANNEL = '#jenkins-ci'
    }	

    env.AWS_ECR_LOGIN=true
    def newApp
    def registry = 'krandmm/microservices-node-todo-frontend'
    def version = ':v0.1.'
    def registryCredential = 'docker-hub'
	
	stage('Git') {
		git 'https://github.com/sunpyopark/node-todo-frontend'
	}
	stage('Build') {
		sh 'npm install'
	}
	stage('Test') {
		sh 'npm test'
	}
	stage('Building image') {
        docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
		    def buildName = registry + version + ":$BUILD_NUMBER"
			newApp = docker.build buildName
			newApp.push()
        }
	}
	
	stage('Registring image') {
        docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
    		newApp.push 'latest'
        }
	}
        stage('Removing image') {
            sh "docker rmi $registry:$BUILD_NUMBER --force"
            sh "docker rmi $registry:latest --force"
        }
	stage("Slack speak") {
        slackSend color: '#BADA55', message: 'Hello, World!'
        }
}
