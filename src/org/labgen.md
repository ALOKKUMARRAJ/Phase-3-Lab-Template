
# LABGEN REQUIREMENTS

## User
Hosting Engineer

### User Requirement
The user should be able to build and deploy a lab and its experiments using a json file to describe the lab and its experiments.

## Interface Requirements
1. The system should provide a command line interface to the user with the following commands: ```init```, ```run```
2. The ```init``` command, given the path to a local lab repository should generate a json file (called ```lab-descriptor.json```) with placeholders for all fields required for building and deploying a lab and its experiments.
3. The ```run``` command, given the path to a local lab repository should build and deploy the lab and all its experiments using the json file (```lab-descriptor.json```) available in the local repository.

## Initialize
The lab and experiment building and deployment process requires a **lab-descriptor** json file that describes the lab and all its experiments. To help the user get started with populating the json file, the initialize process should create a sample json file in the local lab repository containing all the required fields.

## Run
This process should build and deploy all the experiments and the lab using the **lab-descriptor** json file available in the local lab repository.

### Lab
A lab is described by the following fields:
- Name
- Discipline
- Discipline URL
- Host
- Phase
- Experiments
- College
- Introduction
- Objective (Optional)
- Target Audience
- Course Alignment

The Following Pages should be generated:
- *Introduction.html*
- *ListOfExperiments.html*
- *Objective.html* (Optional: Only if the objective is defined in the descriptor)
- *TargetAudience.html*
- *CourseAlignment.html*
- *Feedback.html*

Each page should display the following (lab specific) information:
- Discipline (with link to discipline home page)
- Lab Name
- Navigation links to each page listed above

### Experiments
The experiments in a lab are described in the lab-descriptor json file.  The following informatioin is available for each experiment:

- Name
- Short Name
- Repository URL
- Tag
- Kind

#### Kinds of Experiments
The system should support build and deployment of the following two kinds of experiments.
1. IIITH Experiments
2. Phase 3 Markdown Experiments

Each kind of experiment has a different build process which is described in the related experiment project repository.

## Functional Requirements

### Lab
1. Using the lab descriptor json file the system should generate lab pages.
2. The generated pages should be deployed to the appropriate public server if the following conditions are satisfied:
  a) The lab pages are generated successfuly.
  b) All the experiments in the lab (described in the json) are built and deployed successfully.
3. If the lab is deployed, the lab descriptor should be updated to contain the appropriate version number of the lab (derived from the latest version) and a new tag should be released with the same version number.
4. Print the generated lab's URL and Version number to a log file.

### Experiments
1. All the experiments described in the json should be built and deployed.
2. If any of experiment fails during build or deployment the system should not deploy any of the experiments.
2. Print the list of all the deployed experiments with their URLs and versions to a log file.



