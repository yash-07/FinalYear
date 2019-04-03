const moment = require('moment');
module.exports = {
	//select: function(selected,options){
		//return options.fn(this).replaced(new RegExp( 'value=\"'+ selected +'\"'),'$&selected = "selected" ');
	//}
	generateTime: function(date,format){

		return moment(date).format(format);
	}
}; 


module.exports = {
	if_ideq: function(obj1,obj2){

	if(obj1 == obj2)
	{
		return true;
		}
	else 
		return false;
	}
	
};
