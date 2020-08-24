 window.onload = function(){
            
            let fullNameControl      = document.querySelector("#fullName");
            let rollNoControl        = document.querySelector("#rollNo");
            let subjectControl       = document.querySelector("#subject");
            let outOfMarksControl    = document.querySelector("#outOfMarks");
            let obtainedMarksControl = document.querySelector("#obtainedMarks");
            let addMoreSubjectButton = document.querySelector("#addMoreSubject");
            let submitButton         = document.querySelector("#submit");
            let recordTable = document.querySelector("#table");
            let showResultButton = document.querySelector("#scoreCardButton");
            let scoreCardObject = new ScoreCard();
            addMoreSubjectButton.onclick = function(ev){
                addSubjectList();
            };
            submitButton.onclick = function(ev){
                submitRecord();
            };
            showResultButton.onclick = function(ev){
                let link = document.createElement("a");
                link.href = "./result.html";
                link.target = "_blank";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
            
            let record = new ScoreCard();
            record.setFullName("dattatray");
            function getSubjectInput(){
                let subjectData = new Subject();
                subjectData.setSubjectName(subjectControl.value);
                subjectData.setOutOfMarks(outOfMarksControl.value);
                subjectData.setObtainedMarks(obtainedMarksControl.value);
                return subjectData;
            }
            function deleteRecord(index){
                let result = confirm("Do You Really Want Delete Record ? ");
                if(!result){
                    return;
                }
                let record = scoreCardObject.getSubjectList()[index];
                scoreCardObject.getSubjectList().splice(index,1);
                removeAllTableRecord();
                drawRecord(scoreCardObject,recordTable); // redraw table record when deleted
            }

            function addSubjectList(){
                if(!subjectRecordValidation()){
                    return;
                }
                let subjectData = getSubjectInput();    
                scoreCardObject.getSubjectList().push(subjectData);
                removeAllTableRecord();
                drawRecord(scoreCardObject,recordTable);
                resetAllSubjectFormData();
            }
            function removeAllTableRecord(){
                let childNode = null;
                while((childNode = recordTable.lastElementChild)){
                    recordTable.removeChild(childNode);
                }
            }
            function submitRecord(){
                try{
                    if(!validation()){
                        return;
                    }
                    scoreCardObject.setFullName(fullNameControl.value);
                    scoreCardObject.setRollNo(rollNoControl.value);
                    calculateScoreCardDetails();
                    let resultJsonString = JSON.stringify(scoreCardObject);
                    localStorage.setItem("result",resultJsonString);
                    alert("Record Submitted SuccessFully.");
                }catch(ex){
                    alert(ex);
                }
                
                //  resetAllScoreCard();  // score card reset to blank 
            }






            function drawRecord(scoreCardObject , recordTable){
                for(let i = 0 ;i < scoreCardObject.getSubjectList().length ; i++){
                    let subjectData        = scoreCardObject.getSubjectList()[i];
                    let tableRow           = document.createElement("div");
                    let subjectNode        = document.createElement("div");
                    let outOfMarksNode     = document.createElement("div");
                    let obtainedMarksNode  = document.createElement("div");
                    let lineNode           = document.createElement("div");
                    let deleteNode         = document.createElement("Delete");
                    subjectNode.classList.add("center");
                    outOfMarksNode.classList.add("center");
                    obtainedMarksNode.classList.add("center");
                    deleteNode.classList.add("center","deleteRecord");
                    deleteNode.id = "delete";
                    deleteNode.onclick = function(ev){
                        deleteRecord(i);
                    };
                    lineNode.classList.add("line");
                    subjectNode.textContent = subjectData.getSubjectName();
                    outOfMarksNode.textContent = subjectData.getOutOfMarks();
                    obtainedMarksNode.textContent = subjectData.getObtainedMarks();     
                    deleteNode.textContent = "Delete";       
                    tableRow.classList.add("row","common-padding",);
                    tableRow.appendChild(subjectNode);
                    tableRow.appendChild(outOfMarksNode);
                    tableRow.appendChild(obtainedMarksNode);
                    tableRow.appendChild(deleteNode);
                    recordTable.appendChild(lineNode);
                    recordTable.appendChild(tableRow);
                }
            }
            function validation(){
                let rollNoPattern = /^[a-zA-Z]{4}[0-9]{5}$/;
                let namePattern = /^[a-zA-Z ]+$/;
                
                if(!fullNameControl.value || fullNameControl.value.trim().length == 0){
                    alert("Please Enter Full Name");
                    return false;
                }
                if(fullNameControl.value){
                    if(!namePattern.test(fullNameControl.value)){
                        alert("Name Contained Only Alphabets And Space");
                        return false;
                    }
                }
                if(!rollNoControl.value || rollNoControl.value.trim().length == 0){
                    alert("Please Enter Roll No.");
                    return false;
                }
                if(rollNoControl.value){
                    if(!rollNoPattern.test(rollNoControl.value)){
                        alert("Roll No Should Have In The Alphanumeric Format.");
                        return false;
                    }
                }

                if(!scoreCardObject.getSubjectList() || scoreCardObject.getSubjectList().length == 0){
                    alert("Please Add Atleast One Subject Record!");
                    return false;
                }
                return true;
            }

            function subjectRecordValidation(){
                let subjectData = getSubjectInput();
                let marksPattern = /^(([0-9])+|([0-9]+(.)[0-9]{1,2}))$/;
                if(!subjectData.getSubjectName() || subjectData.getSubjectName().trim().length == 0){
                    alert("Please Enter Subject Name.");
                    return false;
                }
                if(!subjectData.getOutOfMarks() || Number(subjectData.getOutOfMarks()) == 0){
                    alert("Please Select Out Of Mark.");
                    return false;
                }
                if(!subjectData.getObtainedMarks() || subjectData.getObtainedMarks().trim().length == 0){
                    alert("Please Enter Obtained Marks.");
                    return false;
                }
                if(!marksPattern.test(subjectData.getObtainedMarks())){
                    alert("Please Enter Valid Obtained Marks.");
                    return false;
                }

                if(Number(subjectData.getOutOfMarks()) == 50 && Number(subjectData.getObtainedMarks()) > 50){
                    alert("Obtained Marks Should Not Be Greater Than OutOf Mark.");
                    return false;
                }else if(subjectData.getOutOfMarks() == "100" && Number(subjectData.getObtainedMarks())>100){
                    alert("Obtained Marks Should Not Be Greater Than OutOf Mark.");
                    return false;
                }
                return true;
            }
            
            
            function calculateScoreCardDetails(){
                let totalOutOfMarks    = getTotalOutOfMarks();
                let totalObtainedMarks = getTotalObtainedMarks();
                let percentage = 0;
                if(totalOutOfMarks != 0){
                    percentage = (getPercentage(Number(totalOutOfMarks) , Number(totalObtainedMarks)));
                }else{
                    alert("Total OutOf Marks Found 0");
                }
                scoreCardObject.setPercentage(percentage);
                scoreCardObject.setTotalOutOfMarks(totalOutOfMarks);
                scoreCardObject.setTotalObtainedMarks(totalObtainedMarks);
                getGrade(percentage);
                scoreCardObject.setBoard("Pune University");
                scoreCardObject.setAcademicYear("2020");
                scoreCardObject.setCollegeName("Modern College Of Engineering");
                scoreCardObject.setClass("TY MCA");

            }
            function getTotalOutOfMarks(){
                let total = 0;
                scoreCardObject.getSubjectList().forEach(subject => {
                    total += Number(subject.getOutOfMarks()); 
                });
                return total;
            }
            function getTotalObtainedMarks(){
                let total = 0;
                scoreCardObject.getSubjectList().forEach(subject => {
                    total +=Number(subject.getObtainedMarks()); 
                });
                return total;
            }
            function getPercentage(outOfMarks,obtainedMarks){
                let percentage =  ((obtainedMarks * 100) / outOfMarks).toFixed(2);
                return percentage;
            }
            function getGrade(percentage){
                if(percentage >= 75){
                    scoreCardObject.setGrade("Distinction.");
                    scoreCardObject.setResult("Passed With Distinction.");
                }else if(percentage >= 60 && percentage < 75){
                    scoreCardObject.setGrade("First Class");
                    scoreCardObject.setResult("Passed With First Class.");
                }else if(percentage >=35 && percentage <60){
                    scoreCardObject.setGrade("Pass");
                    scoreCardObject.setResult("Passed");
                }else{
                    scoreCardObject.setGrade("Failed");
                    scoreCardObject.setResult("Failed");
                }
            }
            function resetAllSubjectFormData(){
                subjectControl.value = '';
                outOfMarksControl.selectedIndex = "0";
                obtainedMarksControl.value = '';
            }
            function resetAllScoreCard(){
                fullNameControl.value = '';
                rollNoControl.value   = '';
                removeAllTableRecord();
                scoreCardObject.setSubjectList([]);
            }
        };