function ScoreCard(){
    this.subjectList = [];

    this.setFullName = function(fullName){
        this.fullName = fullName;
    };    
    this.getFullName  = function(){
        return this.fullName;
    }; 
    this.setRollNo = function(rollNo){
        this.rollNo = rollNo;
    };
    this.getRollNo = function(){
        return this.rollNo;
    };
    this.setSubjectList = function(subjectList){
        this.subjectList = subjectList;
    };
    this.getSubjectList = function(){
        return this.subjectList;
    };
    this.setTotalOutOfMarks = function(totalOutOfMarks){
        this.totalOutOfMarks = totalOutOfMarks;
    };
    this.getTotalOutOfMarks = function(){
        return this.totalOutOfMarks;
    };
    this.setTotalObtainedMarks = function(totalObtainedMarks){
        this.totalObtainedMarks = totalObtainedMarks;
    };
    this.getTotalObtainedMarks = function(){
        return this.totalObtainedMarks;
    };
    this.setPercentage = function(percentage){
        this.percentage = percentage;
    };
    this.getPercentage = function(){
        return percentage;
    };
    this.setGrade = function(grade){
        this.grade = grade;
    };
    this.getGrade = function(){
        return this.grade;
    };

    this.setCollegeName = function(collegeName){
        this.collegeName = collegeName;
    };
    this.getCollegeName = function(){
        return this.collegeName;
    };
    this.setBoard = function(board){
        this.board = board;
    };
    this.getBoard = function(){
        return this.board;
    };
       this.setAcademicYear = function(academicYear){
        this.academicYear = academicYear;
    };
    this.getAcademicYear = function(){
        return this.academicYear;
    };
    this.setClass = function(className){
        this.className = className;
    };
    this.getClass = function(){
        return this.className;
    };
    this.setResult = function(result){
        this.result = result;
    };
    this.getResult = function(){
        return this.result;
    };
}
function Subject(){
    this.setSubjectName = function(subjectName){
        this.subjectName = subjectName;
    };
    this.getSubjectName = function(){
        return this.subjectName;
    };
    this.setOutOfMarks = function(outOfMarks){
        this.outOfMarks = outOfMarks;
    };
    this.getOutOfMarks = function(){
        return this.outOfMarks;
    };
    this.setObtainedMarks = function(obtainedMarks){
        this.obtainedMarks = obtainedMarks;
    };
    this.getObtainedMarks = function(){
        return this.obtainedMarks;
    };
}
function drawSubjects(scoreCardObject , recordTable){
    for(let i = 0 ;i < scoreCardObject.subjectList.length ; i++){
        let subjectData        = scoreCardObject.subjectList[i];
        let tableRow           = document.createElement("div");
        let subjectNode        = document.createElement("div");
        let outOfMarksNode     = document.createElement("div");
        let obtainedMarksNode  = document.createElement("div");
        let lineNode           = document.createElement("div");
        let srNo = document.createElement('div');

        
        subjectNode.classList.add("center");
        srNo.classList.add("center");
        outOfMarksNode.classList.add("center");
        obtainedMarksNode.classList.add("center");
        lineNode.classList.add("line");
        subjectNode.textContent = subjectData.subjectName;
        outOfMarksNode.textContent = subjectData.outOfMarks;
        obtainedMarksNode.textContent = subjectData.obtainedMarks;    
        srNo.textContent = String(i + 1); 
       
        tableRow.classList.add("row","common-padding",);
        tableRow.appendChild(srNo);
        tableRow.appendChild(subjectNode);
        tableRow.appendChild(outOfMarksNode);
        tableRow.appendChild(obtainedMarksNode);
       

        recordTable.appendChild(lineNode);
        recordTable.appendChild(tableRow);
    }
}

