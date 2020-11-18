node {
    
	

    env.AWS_ECR_LOGIN=true
    def newApp
    def registry = 'krandmm/microservices-node-todo-frontend'
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
        docker.withRegistry( 'https://' + registry, registryCredential ) {
		    def buildName = registry + ":$BUILD_NUMBER"
			newApp = docker.build buildName
			newApp.push()
        }
	}
	
	stage('Registring image') {
        docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
    		newApp.push 'latest2'
        }
	}
    stage('Removing image') {
        sh "docker rmi $registry:$BUILD_NUMBER"
        sh "docker rmi $registry:latest"
    }
    
}
