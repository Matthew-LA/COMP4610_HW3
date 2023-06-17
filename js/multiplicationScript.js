/**
 * File: multiplicationScript.js.html
 * GUI Assignment: HW3
 * Description: Creating an Interactive Dynamic Table
 * Matthew Lorette Anaya, UMass Lowell Computer Science, Matthew_loretteanaya@student.uml.edu
 * Copyright (c) 2023 by Matt. All rights reserved. May be freely copied or
 * excerpted for educational purposes with credit to the author.
 * updated by Matthew Lorette Anaya on June 16, 2023
*/

/*
 * Creates a multiplication table based on the provided boundaries for 
 * multiplier and multiplicand.
 *
 * @param {number} minMultiplier - Lower bound for the multiplier.
 * @param {number} maxMultiplier - Upper bound for the multiplier.
 * @param {number} minMultiplicand - Lower bound for the multiplicand.
 * @param {number} maxMultiplicand - Upper bound for the multiplicand.
 * @return {HTMLElement} - Constructed multiplication table.
 */
const createMultiplicationTable = (minMultiplier, maxMultiplier, minMultiplicand, maxMultiplicand) => {
    const multiplicationTable = document.createElement('table');
    multiplicationTable.id = 'multiplicationTable';
    
    for(let rowIndex = minMultiplicand - 1; rowIndex <= maxMultiplicand; rowIndex++) {
        const row = document.createElement('tr');
        
        for(let columnIndex = minMultiplier - 1; columnIndex <= maxMultiplier; columnIndex++) {
            const cell = document.createElement((rowIndex === minMultiplicand - 1 || columnIndex === minMultiplier - 1) ? 'th' : 'td');
            if(rowIndex === minMultiplicand - 1 && columnIndex === minMultiplier - 1) {
                cell.textContent = '';
            } else if(rowIndex === minMultiplicand - 1) {
                cell.textContent = columnIndex;
            } else if(columnIndex === minMultiplier - 1) {
                cell.textContent = rowIndex;
            } else {
                cell.textContent = rowIndex * columnIndex;
            }
            row.appendChild(cell);
        }
        multiplicationTable.appendChild(row);
    }
    return multiplicationTable;
}
/**
 * Replaces or appends a new HTML element in the parent.
 *
 * @param {HTMLElement} newNode - The new node to append or replace in the parent.
 * @param {Node} parentNode - The parent node.
 */
const replaceOrAppendNode = (newNode, parentNode) => {
    const existingNode = document.getElementById(newNode.id);
    existingNode && existingNode.parentNode === parentNode ? parentNode.replaceChild(newNode, existingNode) : parentNode.appendChild(newNode);
}

// Checking if the FormProcessor is not already defined.
if (typeof FormProcessor === "undefined") { 

    /**
     * FormProcessor module handles form validation and submission.
     */
    const FormProcessor = (() => {
        let form;
        const minErrorMsg = 'Min value must be <= to maximum value.';
        const maxErrorMsg = 'Max value must be >= to minimum value.';
        
        /**
         * Initializes event listeners for the form. 
         * Triggers input validation and table generation on form submission.
         */
        const initialize = () => {
            form = document.getElementById('multiplicationForm');
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const multiplicationTable = createMultiplicationTable(
                    form.elements['multiplierMinValue'].value,
                    form.elements['multiplierMaxValue'].value,
                    form.elements['multiplicandMinValue'].value,
                    form.elements['multiplicandMaxValue'].value
                );
                replaceOrAppendNode(multiplicationTable, form);
            });
            
            Array.from(form.elements)
                .filter(element => element.type === 'number')
                .forEach(inputElement => inputElement.addEventListener('input', validateInput));
        }
       
        /**
         * Validates user-entered data.
         * Sets custom validation messages if the min value is greater than the max value.
         */
        const validateInput = () => {
            const minInput = form.elements[this.name.replace('Max', 'Min') + 'Value'];
            const maxInput = form.elements[this.name.replace('Min', 'Max') + 'Value'];
            
            if(minInput && maxInput && minInput.value > maxInput.value) {
                minInput.setCustomValidity(minErrorMsg);
                maxInput.setCustomValidity(maxErrorMsg);
            } else {
                minInput.setCustomValidity('');
                maxInput.setCustomValidity('');
            }
        }
        
        return {
            initialize
        };
    })();

    document.addEventListener('DOMContentLoaded', FormProcessor.initialize);
};
