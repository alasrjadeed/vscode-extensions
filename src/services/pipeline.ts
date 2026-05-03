class BuildPipeline {
    triggerBuild() {
        // Logic to trigger a build
        console.log('Build triggered.');
    }

    deployToEnvironment() {
        // Logic to deploy to the environment
        console.log('Deployed to environment.');
    }

    rollback() {
        // Logic to rollback the deployment
        console.log('Rollback executed.');
    }
}

export default BuildPipeline;