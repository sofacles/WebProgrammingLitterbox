/*IE8 doesn't have Array.indexOf, so polyfill it*/
if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function (str)
	{
		for (var i = 0; i < this.length; i++)
		{
			if (this[i] === str)
			{
				return i;
			}
		}
		return -1;
	};
}


var comboBoxTest = angular.module("comboBoxTest", []);
comboBoxTest.controller('someController', ["$scope", function ($scope)
{
	$scope.selectedFruit = "Pear";
	$scope.fruits = ["Pear", "Banana", "Cherry"];
	$scope.onUpdated = function (fruit)
	{
		$scope.selectedFruit = fruit;
	};
} ]);


/*
Having a directive have its own controller is inspired largely by
 http://joelhooks.com/blog/2014/02/11/lets-make-full-ass-angularjs-directives/.
comboBoxController can be initialized by passing an array of strings to its init method.  These are used 
for the normal options in a select tag.  The last option in the select is "other".
If you click on that, the select control is replaced by a text box with 'OK' and 'Cancel' buttons.  
 It would be nice to expose the currently selected value as a property
that could be read by the parent controller. */
comboBoxTest.controller("comboBoxController", ["$scope", function ($scope)
{
	/* $scope.init won't be accessible from the directive below. Need "this." or revealing module pattern. */
	function init(selectedPreset, presets)
	{
		$scope.cfg = { inCustomMode: false, /*When true, hide select and show text box and buttons */
			chosenValue: selectedPreset,
			myPresets: angular.copy(presets)
		};

		$scope.cfg.myPresets.push("other");
		$scope.setDefaultPreset();

		$scope.$watch("cfg.chosenPreset", function (newValue)
		{
			if (presets.indexOf(newValue) === -1)
			{
				$scope.cfg.inCustomMode = true;
			}
			else
			{
				$scope.cfg.inCustomMode = false;
			}
			$scope.cfg.chosenValue = newValue;
			$scope.onUpdated({ fruit: newValue }); //see http://onehungrymind.com/angularjs-sticky-notes-pt-2-isolated-scope/
			
		});
	}

	$scope.cancel = function ()
	{
		$scope.cfg.inCustomMode = false;
		$scope.setDefaultPreset();
	};

	$scope.setNewCustomValue = function (val)
	{
		//Get rid of "other".
		$scope.cfg.myPresets.splice($scope.cfg.myPresets.length - 1, 1);
		$scope.cfg.myPresets.push(val);
		$scope.cfg.inCustomMode = false;
	};

	$scope.setDefaultPreset = function ()
	{
		var idx = $scope.cfg.myPresets.indexOf($scope.cfg.chosenValue);
		$scope.cfg.chosenPreset = $scope.cfg.myPresets[idx === -1 ? 0 : idx];
	};

	return { init: init };
} ]);


comboBoxTest.directive("comboBox", [function ()
{
	/* I could probably use "selectedValue" for both the scope variable and the attribute name on this directive
	that the calling code can use to set its notion of the selected Value, but I am  trying to keep the ideas 
	clear in my head
	 */
	return {
		restrict: 'EA',
		scope: {	localSelectedValue: '=selectedValue', 
					presetsFromParent: '=presets',
					onUpdated: '&'
		},
		replace: true,
		controller: 'comboBoxController',
		templateUrl: 'comboBoxTemplate.htm',
		link: function ($scope, $element, $attrs, comboctrl)
		{
			comboctrl.init($scope.localSelectedValue, $scope.presetsFromParent);
		}
	};
} ]);