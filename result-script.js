function drawSubjects(scoreCardObject , recordTable){
    for(let i = 0 ;i < scoreCardObject.getSubjectList().length ; i++){
        let subjectData        = scoreCardObject.getSubjectList()[i];
        let tableRow           = document.createElement("div");
        let subjectNode        = document.createElement("div");
        let outOfMarksNode     = document.createElement("div");
        let obtainedMarksNode  = document.createElement("div");
        let lineNode           = document.createElement("div");
        
        subjectNode.classList.add("center");
        outOfMarksNode.classList.add("center");
        obtainedMarksNode.classList.add("center");
        lineNode.classList.add("line");
        subjectNode.textContent = subjectData.getSubjectName();
        outOfMarksNode.textContent = subjectData.getOutOfMarks();
        obtainedMarksNode.textContent = subjectData.getObtainedMarks();     
        deleteNode.textContent = "Delete";       
        tableRow.classList.add("row","common-padding",);
        tableRow.appendChild(subjectNode);
        tableRow.appendChild(outOfMarksNode);
        tableRow.appendChild(obtainedMarksNode);
        recordTable.appendChild(lineNode);
        recordTable.appendChild(tableRow);
    }
}