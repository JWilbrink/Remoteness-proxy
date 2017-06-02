function generateDashboard(data,geom){

    var map = new lg.map('#map').geojson(geom).nameAttr('TRAD_AUTH').joinAttr('P_CODE').zoom(6.6).center([-13,34]);
	
    var sovi = new lg.column("#sovi").label("Social Vulnerability Index").axisLabels(false);
	     
    var SD = new lg.column("#settlem_km2").label("Settlement Density").axisLabels(true);
      
    var SS = new lg.column("#settlement_size").label("Settlement Size").axisLabels(false);
    
    var NS = new lg.column("#nr_settlements").label("Number of Settlements").axisLabels(false);  
	
	var TTC = new lg.column("#tt_cities").label("Travel Time to Cities").axisLabels(false);
	
    var TTH = new lg.column("#tt_hospitals").label("Travel Time to Hospitals").axisLabels(false);
    
    var TTSS = new lg.column("#tt_secschools").label("Travel Time to Secondary Schools").axisLabels(false);
    
	//The below entry was missing the .axisLabels(false) part at the end.    
	var TTTC = new lg.column("#tt_tradcenters").label("Travel Time to Trading Centres").axisLabels(false);  
	 
	var TTPS = new lg.column("#tt_primschools").label("Travel Time to Primary Schools").axisLabels(false);
	
    var TTWP = new lg.column("#tt_waterpoints").label("Travel Time to Waterpoints").axisLabels(false);
    
	//Below line mentioned "Povert level" instead of "Poverty level":
    var MR = new lg.column("#mean_ruggedness").label("Mean Ruggedness Index").axisLabels(false);
    
	var RL = new lg.column("#rd_length_km").label("Road Length").axisLabels(false);
	
    var RD = new lg.column("#kmroad_km2").label("Road Density").axisLabels(false);
		
   
    		
    
    var PLM = new lg.column("#pred_lm1").label("Predicted LM").axisLabels(false);
    
    var PRF = new lg.column("#predRF1").label("Predicted RF").axisLabels(false);
    
	var DLM = new lg.column("#dif_lm2").label("Over and under prediction LM").axisLabels(false)
       		.colorAccessor(function(d){ if (d>0.15) {return 0;}  else if (d>=-0.15) {return 2;}  else if (d<-0.15) {return 4;}})
		.colors(['#d7191c','#fdae61','#ffffbf','#DA70D6','#8B008B']);

 	var DRF = new lg.column("#dif_rf2").label("Over and under prediction RF").axisLabels(false)
          		.colorAccessor(function(d){ if (d>0.15) {return 0;}  else if (d>=-0.15) {return 2;}  else if (d<-0.15) {return 4;}})
		.colors(['#d7191c','#fdae61','#ffffbf','#DA70D6','#8B008B']);
		
    lg.colors(["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"]);
		
	var group1 = 1;
	var group2 = 12;
	var group3 = 0;
	var group4 = 0;
	
	var name1 = 'Y-variable';
	var name2 = 'X-variables';

    var grid1 = new lg.grid('#grid1')
        .data(data)
        .width($('#grid1').width())
        .height(5000)
		.width(750)
        .nameAttr('#trad_auth')
        .joinAttr('#p_code')
        .hWhiteSpace(4)
        .vWhiteSpace(4)
		//Adjust the below parameters to re-size the table within the maximum assigned height and width of the grid.
		//The parameters for left and right are adjusted, so that the full names of the entries in the 1st column do not overflow into the 2nd column.
		//The text "Independent (X) variables" should appear correctly now.
        .margins({top: 250, right: 80, bottom: 30, left: 270})
         .columns([sovi,SD,NS,SS,RL,RD,MR,TTH,TTSS,TTPS,TTC, TTTC,TTWP])
		;



    $('#run1').on('click',function(){
    var group1 = 1;
	var group2 = 7;
	var group3 = 7;
	var group4 = 0;
			
        lg._gridRegister = [];
		$('#run2').css({'background-color': 'grey' });
		$('#run1').css({'background-color': 'green' }); //was: '#BF002D'
        $('#map-container').html('<div id="map"></div>');
        $('#grid1').html('');
        grid1 = new lg.grid('#grid1')
            .data(data)
            .width($('#grid1').width())
            .height(5000)
			.width(750)
            .nameAttr('#trad_auth')
            .joinAttr('#p_code')
            .hWhiteSpace(4)
            .vWhiteSpace(4)
			//Adjust the below parameters to re-size the table within the maximum assigned height and width of the grid.
			//The parameters for left and right are adjusted, so that the full names of the entries in the 1st column do not overflow into the 2nd column.
			//The text "Independent (X) variables" should appear correctly now.			
            .margins({top: 250, right: 120, bottom: 30, left: 270})
            .columns([sovi,PLM,PRF,DLM,DRF])
            ;  
            
              
	$('#run2').on('click',function(){
		
        lg._gridRegister = [];
		$('#run1').css({'background-color': 'grey' });
		$('#run2').css({'background-color': 'green' }); //was: '#BF002D' 
        $('#map-container').html('<div id="map"></div>');
        $('#grid1').html('');
        grid1 = new lg.grid('#grid1')
            .data(data)
            .width($('#grid1').width())
            .height(5000)
			.width(750)
            .nameAttr('#trad_auth')
            .joinAttr('#p_code')
            .hWhiteSpace(4)
            .vWhiteSpace(4)
			//Adjust the below parameters to re-size the table within the maximum assigned height and width of the grid.
			//The parameters for left and right are adjusted, so that the full names of the entries in the 1st column do not overflow into the 2nd column.
			//The text "Independent (X) variables" should appear correctly now.
            .margins({top: 250, right: 80, bottom: 30, left: 270})
            .columns([sovi,SD,NS,SS,RL,RD,MR,TTH,TTSS,TTPS,TTC, TTTC,TTWP])
            ;    
		
		lg.init();
        initlayout(data,sovi,'#sovi');
        $("#map").width($("#map").width());
    });
		
		
		
		
		lg.init();
        
        $("#map").width($("#map").width());
    });
	
	
		
	lg.init();
    initlayout(data,sovi,'#sovi');
    $("#map").width($("#map").width());	

    function initlayout(data,sort_indicator1,sort_indicator2){

        //sort table and color map by priority after loading dashboard
        var newdata = [];
        data.forEach(function(d){
            newdata.push({'key':d['#p_code'],'value':d[sort_indicator2]});
        });
        map.colorMap(newdata,sort_indicator1);
        grid1._update(data,grid1.columns(),sort_indicator1,'#trad_auth');


    	
		//////////////////////////////////////////
		//Create the category lines above the grid
		//////////////////////////////////////////

		var g = d3.select('#grid1').select('svg').select('g').append('g');

		//Add the number of variables per group
		var offset_hor = 0;
		var offset_vert = -30;
		
		//horizontal line 1
		g.append('line').attr("x1", 0+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", (lg._gridRegister[0]._properties.boxWidth)*group1+(lg._gridRegister[0]._hWhiteSpace)*(group1-1)+offset_hor)
						.attr("y2", offset_vert)
						.attr("stroke-width", 1)
						.attr("stroke", "black");

		//horizontal line 2
		g.append('line').attr("x1", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*group1+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", (lg._gridRegister[0]._properties.boxWidth)*(group1+group2)+(lg._gridRegister[0]._hWhiteSpace)*(group1+group2-1)+offset_hor)
						.attr("y2", offset_vert)
						.attr("stroke-width", 1)
						.attr("stroke", "black");

 		//horizontal line 3
		g.append('line').attr("x1", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2)+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", (lg._gridRegister[0]._properties.boxWidth)*(group1+group2+group3)+(lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3-1)+offset_hor)
						.attr("y2", offset_vert)
						.attr("stroke-width", 1)
						.attr("stroke", "black");

/*		//horizontal line 4
		g.append('line').attr("x1", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3)+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3+group4))
						.attr("y2", offset_vert)
						.attr("stroke-width", 1)
						.attr("stroke", "black"); */

		//vertical line 1.1
		g.append('line').attr("x1", 0+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", 0+offset_hor)
						.attr("y2", (offset_vert-5))
						.attr("stroke-width", 1)
						.attr("stroke", "black");

		//vertical line 1.2
		g.append('line').attr("x1", lg._gridRegister[0]._properties.boxWidth*(group1)+(lg._gridRegister[0]._hWhiteSpace)*(group1-1)+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", lg._gridRegister[0]._properties.boxWidth*(group1)+(lg._gridRegister[0]._hWhiteSpace)*(group1-1)+offset_hor)
						.attr("y2", (offset_vert-5))
						.attr("stroke-width", 1)
						.attr("stroke", "black");

		//vertical line 2.1
		g.append('line').attr("x1", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1)+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1)+offset_hor)
						.attr("y2", (offset_vert-5))
						.attr("stroke-width", 1)
						.attr("stroke", "black");

		//vertical line 2.2
		g.append('line').attr("x1", lg._gridRegister[0]._properties.boxWidth*(group1+group2)+(lg._gridRegister[0]._hWhiteSpace)*(group1+group2-1)+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", lg._gridRegister[0]._properties.boxWidth*(group1+group2)+(lg._gridRegister[0]._hWhiteSpace)*(group1+group2-1)+offset_hor)
						.attr("y2", (offset_vert-5))
						.attr("stroke-width", 1)
						.attr("stroke", "black");

		//vertical line 3.1
		g.append('line').attr("x1", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2)+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2)+offset_hor)
						.attr("y2", (offset_vert-5))
						.attr("stroke-width", 1)
						.attr("stroke", "black");

		//vertical line 3.2
		g.append('line').attr("x1", lg._gridRegister[0]._properties.boxWidth*(group1+group2+group3)+(lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3-1)+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", lg._gridRegister[0]._properties.boxWidth*(group1+group2+group3)+(lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3-1)+offset_hor)
						.attr("y2", (offset_vert-5))
						.attr("stroke-width", 1)
						.attr("stroke", "black");

		/* //vertical line 4.1
		g.append('line').attr("x1", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3)+offset_hor)
						.attr("y1", offset_vert)
						.attr("x2", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3)+offset_hor)
						.attr("y2", (offset_vert-5))
						.attr("stroke-width", 1)
						.attr("stroke", "black");

		//vertical line 4.2
		g.append('line').attr("x1", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3+group4))
						.attr("y1", offset_vert)
						.attr("x2", (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3+group4))
						.attr("y2", (offset_vert-5))
						.attr("stroke-width", 1)
						.attr("stroke", "black"); */

		//horizontal text 1
		g.append('text').attr('x', lg._gridRegister[0]._properties.boxWidth*(group1/2)+offset_hor)
						.attr('y', (offset_vert+15))
						.text(name1)
						.style("text-anchor", "middle")
						.attr("font-size",12);

		//horizontal text 2
		g.append('text').attr('x', (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2/2)+offset_hor)
						.attr('y', (offset_vert+15))
						.text(name2)
						.style("text-anchor", "middle")
						.attr("font-size",12);              

 		/*//horizontal text 3
		g.append('text').attr('x', (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3/2)+offset_hor)
						.attr('y', (offset_vert+15))
						.text(name3a)
						.style("text-anchor", "middle")
						.attr("font-size",12);              

/*		//horizontal text 4
		g.append('text').attr('x', (lg._gridRegister[0]._properties.boxWidth+lg._gridRegister[0]._hWhiteSpace)*(group1+group2+group3+group4/2)+offset_hor)
						.attr('y', (offset_vert+15))
						.text('Demographics')
						.style("text-anchor", "middle")
						.attr("font-size",12);      */                                                                                                                             
	}
}

function hxlProxyToJSON(input,headers){
    var output = [];
    var keys=[]
    input.forEach(function(e,i){
        if(i==0){
            e.forEach(function(e2,i2){
            	console.log(e2);
                var parts = e2.split('+');
                var key = parts[0]
                if(parts.length>1){
                    var atts = parts.splice(1,parts.length);
                    atts.sort();                    
                    atts.forEach(function(att){
                        key +='+'+att
                    });
                }
                keys.push(key);
            });
        } else {
            var row = {};
            e.forEach(function(e2,i2){
                row[keys[i2]] = e2;
            });
            output.push(row);
        }
    });
    return output;
}

function stickydiv(){
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top){
        $('#map-container').addClass('sticky');
    }
    else{
        $('#map-container').removeClass('sticky');
    }
};

$(window).scroll(function(){
    stickydiv();
}); 

//load data

var dataCall = $.ajax({ 
    type: 'GET', 
    url: 'data/data.json', //https://proxy.hxlstandard.org/data.json?merge-keys01=%23adm2%2Bcode&strip-headers=on&filter01=merge&merge-url01=https%3A//docs.google.com/spreadsheets/d/1klRixK82iRk1JnDOpAqKrry4VQiFcTGrfFZWr9ih-Z8/pub%3Fgid%3D777123392%26single%3Dtrue%26output%3Dcsv&url=https%3A//docs.google.com/spreadsheets/d/1OlxhQ_ejRKNvohbnfJ7yJPKD6U6pXcPPfsFnwBbP2nc/pub%3Fgid%3D0%26single%3Dtrue%26output%3Dcsv&filter02=select&select-query02-01=%23indicator%2Bcategory%21%3D1&merge-tags01=%23affected%2Bdeaths%2C%23affected%2Bmissing%2C%23affected%2Bwounded%2C%23affected%2Binshelter%2C%23affected%2Bbuildings%2Bdestroyed%2C%23affected%2Bbuildings%2Bpartially%2C%23affected%2Bschools', 
    dataType: 'json',
});

//load geometry

var geomCall = $.ajax({ 
    type: 'GET', 
    url: 'data/geom.json', 
    dataType: 'json',
});

//when both ready construct dashboard

$.when(dataCall, geomCall).then(function(dataArgs,geomArgs){
    geom = topojson.feature(geomArgs[0],geomArgs[0].objects.geom);
	console.log(dataArgs);
    overview = hxlProxyToJSON(dataArgs[0],false);
    generateDashboard(overview,geom);
});
