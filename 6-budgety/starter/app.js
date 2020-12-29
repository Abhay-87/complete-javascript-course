var budgetController = (function () {
    //This will calculate budget
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
        this.percentage = -1
    };
    
    Expense.prototype.calculatePercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    };
    
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        })
        data.total[type] = sum;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    
    return {
        addItem: function(type, desc, value) {
            var ID, newItem;
            //Creating ID using array length
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                ID = 0;
            }
            
            //Creating new Item based on type 
            if(type === 'exp') {
                newItem = new Expense(ID, desc, value);
            }else {
                newItem = new Income(ID, desc, value);
            }
            
            //Pushing new Item into private  data object
            data.allItems[type].push(newItem);
            
            //return the new element
            return newItem;
        },
        
        deleteItm: function(type, id) {
            var ids, index;
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            })
            index = ids.indexOf(id);
            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        
        calculatePercentages: function() {
              data.allItems.exp.forEach(function(current) {
                  current.calculatePercentage(data.total.inc);
              })
        },
        
        getPercentages: function() {
            var perc = data.allItems.exp.map(function(current) {
                return current.percentage;
            });
            return perc;
        },
        
        calculateBudget: function() {
            //Calculate Total
            calculateTotal('exp');
            calculateTotal('inc');
            //Calculate Budget 
            data.budget = data.total.inc - data.total.exp;
            //Calculate Percentage
            if(data.total.inc > 0 ) {
                data.percentage = Math.round((data.total.exp / data.total.inc) * 100);    
            }else {
                data.percentage = -1;
            }
            
        },
        
        returnBudget: function() {
            return {
                budget: data.budget,
                income: data.total.inc,
                expense: data.total.exp,
                percentage: data.percentage
            }
        },
            
        //below function is just for testing
        testing: function() {
            console.log(data);
        }
    };
}) ();

var uiController = (function() {
    // This will update UI 
    
    //Declaring constants for button class.
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        totalBudgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        epensePercentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    var formatNumber= function(num, type) {
            var numSplit, intPart, decPart;
            
            num = Math.abs(num);
            num = num.toFixed(2);
            
            numSplit = num.split('.');
            intPart = numSplit[0];
            
            if(intPart.length > 3) {
                intPart = intPart.substr(0, intPart.length-3) + ',' + intPart.substr(intPart.length-3, 3);
            }
            
            decPart = numSplit[1];
            
            return (type === 'exp' ? '-' : '+')+' '+ intPart +'.'+decPart;
    };
    
    var forEachForList = function(list, callback) {
                for(var i=0; i<list.length; i++) {
                    callback(list[i], i);
                }
    };
    
    return {
        getDOMstrings: function() {
            return DOMStrings;
        }, 
        
        getInput: function() {
            return {
              type: document.querySelector(DOMStrings.inputType).value,
              description: document.querySelector(DOMStrings.inputDescription).value,
              value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string
            if(type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>'+
                    '<div class="right clearfix"><div class="item__value">%value%</div>'+
                    '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                    '</div></div></div>';    
            }else if(type === 'exp') {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>'+
                    '<div class="right clearfix"><div class="item__value">%value%</div>'+
                    '<div class="item__percentage">21%</div><div class="item__delete">'+
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                    '</div></div></div>';
            }
            // UPdate HTML string
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            // Insert HTML element
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },
        
        deleteListItem: function(selectorId) {
            var el = document.getElementById(selectorId);
            el.parentNode.removeChild(el);
            
        },
        
        displayBudget: function(obj) {
            var type;
            type = (obj.budget > 0) ? 'inc' : 'exp';
            document.querySelector(DOMStrings.totalBudgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.income,'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.expense, 'exp');
            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.epensePercentageLabel).textContent = obj.percentage + '%';   
            } else {
                document.querySelector(DOMStrings.epensePercentageLabel).textContent = '---';
            }
            
        },
        
        displayDate: function() {
            
            var month, months, now, year;
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
            now = new Date();
            
            month = now.getMonth();
            year = now.getFullYear();
            
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensePercLabel);
            
            forEachForList(fields, function(current, index) {
                console.log('current '+current);
                console.log('index '+index);
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                }else {
                    current.textContent = '---';
                }
            });
        },
        
        changeType: function() {
            var fields;
            
            fields = document.querySelectorAll(
                DOMStrings.inputType+','+
                DOMStrings.inputDescription+','+
                DOMStrings.inputValue
            );
            
            forEachForList(fields, function(current) {
                current.classList.toggle('red-focus');
            });
            
            document.querySelector(DOMStrings.addButton).classList.toggle('red');
        },
        
        clearFields: function() {
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMStrings.inputDescription +','+ DOMStrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            // Callback function inside forEach will have access to three things.
            // 1. Current Element of Array.
            // 2. Index of current Element.
            // 3. Whole array object as well.
            // This is similar to call-back method which we pass to Event listener of click event,
            // It has access to Event object.
            fieldsArray.forEach(function(currentEle, index, array) {
                currentEle.value = ""
            })
            fieldsArray[0].focus();
        }
    };
    
})();

var controller = (function(bdgtCntrl, uiCntrl) {
    
    var initEventListeners = function() {
        var dom = uiCntrl.getDOMstrings();
        console.log(dom);
        document.querySelector(dom.addButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        
        document.querySelector(dom.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(dom.inputType).addEventListener('change', uiCntrl.changeType);

    }
    
    var budgetCalculator = function() {
        // calculate budget
        bdgtCntrl.calculateBudget();
        //Return the budget 
        var budget = bdgtCntrl.returnBudget();
        
        //Display in UI
        console.log(budget);
        uiCntrl.displayBudget(budget);
    };
    
    var updatePercentages = function() {
        //Calculate Percentage
        bdgtCntrl.calculatePercentages();
        //Read Percentage from budget controller
        var percentages = bdgtCntrl.getPercentages();
        
        //Update the UI with new percentages
        uiCntrl.displayPercentages(percentages);
    };
    
    var ctrlAddItem = function() {
        var input, newItem;
        //1. Get the field input data
        input = uiCntrl.getInput();
        
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to budget controller.
            newItem = bdgtCntrl.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI and Clear fields
            uiCntrl.addListItem(newItem, input.type);
            uiCntrl.clearFields();

            //4. Calculate the budget
            budgetCalculator();
            
            updatePercentages();
            //5. Displaye the budget on UI.
            console.log('It works');
        }
        
        
    }
    
    var ctrlDeleteItem = function(event) {
        var itemId, splitId, type, ID;
        
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log('itemId '+ itemId);
        if(itemId) {
            splitId = itemId.split('-');
            type = splitId[0];
            ID = parseInt(splitId[1]);
            
            bdgtCntrl.deleteItm(type, ID);
            
            uiCntrl.deleteListItem(itemId);
            
            budgetCalculator();
            
            updatePercentages();
        }
    }
    
    return {
        init: function() {
            console.log('Starting App');
            uiCntrl.displayBudget({
                budget: 0,
                income: 0,
                expense: 0,
                percentage: -1
            })
            initEventListeners();
            uiCntrl.displayDate();
        }
    };
    
})(budgetController, uiController);

controller.init();