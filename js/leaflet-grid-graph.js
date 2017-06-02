var lg =  {

    mapRegister:'',
    _gridRegister:[],
    _colors:['#edf8fb','#b2e2e2','#66c2a4','#2ca25f','#006d2c'],
    _selectedBar:-1,

    init: function(){
        this.mapRegister.init();
        this._gridRegister.forEach(function(e){
           e.init(); 
        });       
    },

    colors:function(val){
        if(typeof val === 'undefined'){
            return this._colors;
        } else {
            this._colors=val;
            return this;
        }        
    },

    map: function(id){

        this._id = id;
        this._geojson = "";
        this._center = [0,0];
        this._zoom = 1;
        this._nameAttr = "";
        this._joinAttr = "";
        this._map = '';
        this._info = '';
        this._currentData =[];

        lg.mapRegister = this;

        this.geojson = function(val){
            if(typeof val === 'undefined'){
                return this._geojson;
            } else {
                this._geojson=val;
                return this;
            }        
        };

        this.center = function(val){
            if(typeof val === 'undefined'){
                return this._center;
            } else {
                this._center=val;
                return this;
            }        
        };


        this.zoom = function(val){
            if(typeof val === 'undefined'){
                return this._zoom;
            } else {
                this._zoom=val;
                return this;
            }        
        };

        this.joinAttr = function(val){
            if(typeof val === 'undefined'){
                return this._joinAttr;
            } else {
                this._joinAttr=val;
                return this;
            }        
        };

        this.nameAttr = function(val){
            if(typeof val === 'undefined'){
                return this._nameAttr;
            } else {
                this._nameAttr=val;
                return this;
            }        
        };

        this.onClick = function(val){
            if(typeof val === 'undefined'){
                return this._onClick;
            } else {
                this._onClick=val;
                return this;
            }
        }        

        this._style = function(feature){
            return {
                weight: 1,
                opacity: 0.8,
                color:'#000000',
                fillOpacity: 0,
                className: 'dashgeom dashgeom'+feature.properties[lg.mapRegister._joinAttr]
            };
        };

        this._onClick = function(feature){
            return feature;
        }

        this.map = function(){
            return this._map;
        };                

        this.init = function(){
            this._map = this._initMap(this._id,this._geojson,this._center,this._zoom,this._joinAttr);
        };  

        this._initMap = function(id,geojson, center, zoom, joinAttr){

            var _parent = this;

            var baselayer = L.tileLayer('https://data.hdx.rwlabs.org/mapbox-base-tiles/{z}/{x}/{y}.png', {
                
            });

            var map = L.map(this._id.substring(1), {
                center: center,
                zoom: zoom,
                layers: [baselayer]
            });

            this._info = L.control();

            this._info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'mapinfo');
                this.update();
                    return this._div;
                };

            this._info.update = function (name) {
                this._div.innerHTML = (name ? name: 'Hover for details');
            };

            this._info.addTo(map);

            var overlay = L.geoJson(geojson,{
                style: this._style,
                onEachFeature: onEachFeature
            }).addTo(map);                

            return map;

            function onEachFeature(feature, layer) {
                layer.on("mouseover",function(f,l){
                    _parent._info.update(f.target.feature.properties[_parent._nameAttr] + ': ' + findCurrentData(f.target.feature.properties[_parent._joinAttr]));
                });

                layer.on("mouseout",function(f,l){
                    _parent._info.update();
                });

                layer.on("click",function(f,l){
                    _parent._onClick(f.target.feature);
                });

                function findCurrentData(joinAttr){
                    var value = 'N/A'; 
                    _parent._currentData.forEach(function(d){
                        if(d.key==joinAttr){
                            value = d.value;
                        }
                    });

                    return value;
                }
            }            
        }

        this.colorMap = function (data,column){

            this._currentData = data;
            var _parent = this;

            var max = d3.max(data,function(d){
                if(isNaN(d.value)){
                    dn=0;
                } else {
                    dn=d.value
                }
                return Number(dn);
            });

			var min = d3.min(data,function(d){
                if(isNaN(d.value)){
                    dn=0;
                } else {
                    dn=d.value
                }
                return Number(dn);
            });
            data.forEach(function(d,i){
                if(column._valueAccessor(d.value)==null||isNaN(column._valueAccessor(d.value))||column._valueAccessor(d.value)===''){
                    d3.selectAll('.dashgeom'+d.key).attr('fill','#cccccc').attr('fill-opacity',0.8);
                } else {                        
                    var c = column._colorAccessor(d.value,i,min,max);
                    d3.selectAll('.dashgeom'+d.key).attr('fill',column._colors[c]).attr('fill-opacity',0.8);
                }
            });
        }
    },

    column: function(dataName){
        this._dataName = dataName;
        this._labelName = dataName;
        this._scale = d3.scale.linear();
        this._domain = 'default';
        this._axisLabels = true;
        this._colors = 'default';

        this.label = function(val){
            if(typeof val === 'undefined'){
                return this._labelName;
            } else {
                this._labelName=val;
                return this;
            }        
        };

        this.scale = function(val){
            if(typeof val === 'undefined'){
                return this._scale;
            } else {
                this._scale=val;
                return this;
            }        
        };        

        this.domain = function(val){
            if(typeof val === 'undefined'){
                return this._domain;
            } else {
                this._domain=val;
                return this;
            }        
        };

        this.axisLabels = function(val){
            if(typeof val === 'undefined'){
                return this._axisLabels;
            } else {
                this._axisLabels=val;
                return this;
            }        
        };

        this.valueAccessor = function(val){
            if(typeof val === 'undefined'){
                return this._valueAccessor;
            } else {
                this._valueAccessor=val;
                return this;
            }        
        };

        this.colorAccessor = function(val){
            if(typeof val === 'undefined'){
                return this._colorAccessor;
            } else {
                this._colorAccessor=val;
                return this;
            }
        };

        this.labelAccessor = function(val){
            if(typeof val === 'undefined'){
                return this._labelAccessor;
            } else {
                this._labelAccessor = val;
                return this;
            }
        };

        this.colors = function(val){
            if(typeof val === 'undefined'){
                return this._colors;
            } else {
                this._colors=val;
                return this;
            }
        };        

        this._valueAccessor = function(d,i){
            return d
        };


        this._colorAccessor = function(d,i,min,max){
            var c = Math.floor((d-min)/(max-min)*5);
            if(c==5){c=4}
            return c
        };
		
        this._labelAccessor = function(d,i){
            if(isNaN(d) || d==null || d===''){
                return d;
            } else if (d > 0 && d <= 1) {                    
                return d3.format('0,0%')(d);
            } else {                    
                return d3.format('0,000')(d);
            }
        };                     

    },

    grid: function(id){

        this._id = id;
        this._width = 1000;
        this._height = 500;
        this._data = [];
        this._nameAttr = '';
        this._joinAttr = '';
        this._columns = [];
        this._properties = {};
        this._vWhiteSpace = 1;
        this._hWhiteSpace = 1;
        this._properties.margin = {top: 120, right: 50, bottom: 20, left: 120};
        lg._gridRegister.push(this);
        this._idnum = lg._gridRegister.length-1;

        this.width = function(val){
            if(typeof val === 'undefined'){
                return this._width;
            } else {
                this._width=val;
                return this;
            }        
        };

        this.height = function(val){
            if(typeof val === 'undefined'){
                return this._height;
            } else {
                this._height=val;
                return this;
            }        
        };

        this.data = function(val){
            if(typeof val === 'undefined'){
                return this._data;
            } else {
                this._data=val;
                return this;
            }        
        };

        this.margins = function(val){
            if(typeof val === 'undefined'){
                return this._properties.margin;
            } else {
                this._properties.margin=val;
                return this;
            }        
        };        

        this.nameAttr = function(val){
            if(typeof val === 'undefined'){
                return this._nameAttr;
            } else {
                this._nameAttr=val;
                return this;
            }        
        };       

        this.joinAttr = function(val){
            if(typeof val === 'undefined'){
                return this._joinAttr;
            } else {
                this._joinAttr=val;
                return this;
            }        
        };

        this.columns = function(val){
            if(typeof val === 'undefined'){
                return this._columns;
            } else {
                this._columns=val;
                return this;
            }        
        };      

        this.vWhiteSpace = function(val){
            if(typeof val === 'undefined'){
                return this._vWhiteSpace;
            } else {
                this._vWhiteSpace=val;
                return this;
            }        
        };

        this.hWhiteSpace = function(val){
            if(typeof val === 'undefined'){
                return this._hWhiteSpace;
            } else {
                this._hWhiteSpace=val;
                return this;
            }        
        };        

        this.init = function(){
            this.render();
        };

        this._initColumns = function(columns){
            var parent = this;
            var newColumns = [];
            columns.forEach(function(c){
                if(typeof c === 'string'){ 
                    var column = new lg.column(c);
                    //column.domain([0, d3.max(parent._data,function(d){return Number(d[column._dataName]);})]);
                    column.domain([0, d3.max(parent._data,function(d){return Number(d[column._dataName]);})]);
                    column._colors = lg._colors;                  
                    newColumns.push(column);
                } else {
                    if(c._domain=='default'){
                        c.domain([0, d3.max(parent._data,function(d){return Number(d[c._dataName]);})]);
                    }
                    if(c._colors=='default'){
                        c._colors = lg._colors;
                    }                    
                    newColumns.push(c);
                }                
            });
            return newColumns;
        };

        this.render = function(){
            this._render(this._id,this._data,this._nameAttr,this._joinAttr,this._initColumns(this._columns),this._width,this._height);
        };

        this._render = function(id,data,nameAttr,joinAttr,columns,width,height){

            var _parent = this;

            this._properties.width = this._width - this._properties.margin.left - this._properties.margin.right;
            this._properties.height = this._height - this._properties.margin.top - this._properties.margin.bottom;

            this._properties.boxWidth = this._properties.width/columns.length-this._hWhiteSpace;
            this._properties.boxHeight = this._properties.height/data.length-this._vWhiteSpace;      
            this._properties.x = [];
            columns.forEach(function(v,i){
                _parent._properties.x[i] = v._scale.range([0, _parent._properties.boxWidth]).domain(v._domain);         
            });

            var _grid = d3.select(id)
                .append('svg')
                .attr('class', 'dashgrid dashgridid'+_parent._idnum)
                .attr('width', width)
                .attr('height', height)
                .append("g")
                .attr("transform", "translate(" + this._properties.margin.left + "," + this._properties.margin.top + ")");

            var tipsort = d3.tip().attr('class', 'd3-tip').html(function(d,i) {return "Click to sort"});

            var tips=[];     

            columns.forEach(function(v,i){

                tips[i] = d3.tip().attr('class', 'd3-tip').html(function(d,i) {
                    return v._labelAccessor(d.value);
                });                

                var g = _grid.append("g").attr('class','bars');

                data.sort(function(a, b) {
                    return a[_parent._nameAttr].localeCompare(b[_parent._nameAttr]);
                });

                var newData = [];

                data.forEach(function(d,i){
                    var nd = {};
                    nd.pos = d.pos;
                    nd.join = d[_parent._joinAttr];
                    nd.value = d[v._dataName];
                    newData.push(nd);
                });

                var max = d3.max(newData,function(d){
                    return Number(v._valueAccessor(d.value));
                })
				
				var min = d3.min(newData,function(d){
                    return Number(v._valueAccessor(d.value));
                })

                g.selectAll("rect")
                    .data(newData)
                    .enter()
                    .append("rect")
                    .attr('class','bars'+i+'id'+_parent._idnum)
                    .attr("x", function(d,i2){return _parent._properties.boxWidth*i+i*_parent._hWhiteSpace})
                    .attr("y", function(d,i2){return _parent._properties.boxHeight*i2+i2*_parent._vWhiteSpace})
                    .attr("width", function(d){
                        if(v._valueAccessor(d.value)==null||isNaN(v._valueAccessor(d.value)) || v._valueAccessor(d.value)===''){
                            return _parent._properties.boxWidth;
                        }
                        return _parent._properties.x[i](v._valueAccessor(Math.abs(d.value)));
                    })
                    .attr("height", _parent._properties.boxHeight)
                    .attr("fill",function(d,i2){
                        if(v._valueAccessor(d.value)==null||isNaN(v._valueAccessor(d.value)) || v._valueAccessor(d.value)===''){
                            return '#cccccc';
                        }                        
                        var c = v._colorAccessor(d.value,i2,min,max)
                        return v._colors[c];
                    });                 

                var _xTransform = _parent._properties.boxWidth*i+i*_parent._hWhiteSpace;    

                var g = _grid.append("g");

                var topLabels = g.append("text")
                    .text(v._labelName)        
                    .attr("x",30)
                    .attr("y",-10)               
                    .style("text-anchor", "front")
                    .attr("transform", "translate(" + (_xTransform+ _parent._properties.boxWidth/2-10) + "," + -10 + ") rotate(-65)" )
                    .attr("class",function(d){
                        return "sortLabel sortLabel"+i+'id'+_parent._idnum;
                    })
                    .on("click",function(){
                        _parent._update(data,columns,v,nameAttr);
                    });

                topLabels.on("mouseover",function(d,i2){
                        if(lg._selectedBar==-1){
                            d3.selectAll('.maxLabel').attr("opacity",0);
                            d3.selectAll('.sortLabel').style("font-weight","normal");
                            d3.selectAll('.maxLabel'+i+'id'+_parent._idnum).attr("opacity",1);
                            d3.selectAll('.sortLabel'+i+'id'+_parent._idnum).style("font-weight","bold");
                            lg.mapRegister.colorMap(dataSubset,v);
                        }

                    });

                d3.selectAll('.sortLabel').call(tipsort);

                if(v._axisLabels){
                    g.append("text")
                        .text(v._labelAccessor(v._domain[v._domain.length-1]))        
                        .attr("x",_parent._properties.boxWidth-5)
                        .attr("y",_parent._properties.height+10+_parent._vWhiteSpace)               
                        .style("text-anchor", "front")
                        .attr("transform", "translate(" + _xTransform + "," + 0 + ")" )
                        .attr("opacity",0)
                        .attr("class",function(d){return "maxLabel maxLabel"+i+'id'+_parent._idnum});

                    g.append("text")
                        .text(v._labelAccessor(v._domain[0]))        
                        .attr("x",-5)
                        .attr("y",_parent._properties.height+10+_parent._vWhiteSpace)               
                        .style("text-anchor", "front")
                        .attr("transform", "translate(" + _xTransform + "," + 0 + ")" )
                        .attr("opacity",0)
                        .attr("class",function(d){return "maxLabel maxLabel"+i+'id'+_parent._idnum});
                }                    

                g.append("line")
                    .attr("x1", _parent._properties.boxWidth*(i+1)+(i)*_parent._hWhiteSpace)
                    .attr("y1", -_parent._hWhiteSpace/2)
                    .attr("x2", _parent._properties.boxWidth*(i+1)+(i)*_parent._hWhiteSpace)
                    .attr("y2", _parent._properties.height-_parent._vWhiteSpace/2)
                    .attr("opacity",0)
                    .attr("class",function(d){return "maxLabel maxLabel"+i+'id'+_parent._idnum})
                    .attr("stroke-width", 1)
                    .attr("stroke", "#ddd");                    

                g.append("line")
                    .attr("x1", _parent._properties.boxWidth*(i)+(i)*_parent._hWhiteSpace)
                    .attr("y1", -_parent._hWhiteSpace/2)
                    .attr("x2", _parent._properties.boxWidth*(i)+(i)*_parent._hWhiteSpace)
                    .attr("y2", _parent._properties.height-_parent._vWhiteSpace/2)
                    .attr("opacity",0)
                    .attr("class",function(d){return "maxLabel maxLabel"+i+'id'+_parent._idnum})
                    .attr("stroke-width", 1)
                    .attr("stroke", "#ddd");                   

                var g = _grid.append("g");

                var selectBars = g.selectAll("rect")
                    .data(newData)
                    .enter()
                    .append("rect")
                    .attr('class','selectbars'+i+'id'+_parent._idnum)
                    .attr("x", function(d,i2){return _parent._properties.boxWidth*i+i*_parent._hWhiteSpace})
                    .attr("y", function(d,i2){return _parent._properties.boxHeight*i2+i2*_parent._vWhiteSpace})
                    .attr("width", function(d){
                        return _parent._properties.boxWidth+_parent._hWhiteSpace;
                    })
                    .attr("height", _parent._properties.boxHeight+_parent._vWhiteSpace)
                    .attr("opacity",0)
                    
                d3.selectAll('.selectbars'+i+'id'+_parent._idnum).call(tips[i]);

                var dataSubset = [];
                    newData.forEach(function(d){
                        dataSubset.push({'key':d.join,'value':d.value});
                    });

                selectBars.on("mouseover",function(d,i2){

                        d3.selectAll('.dashgeom'+d.join).attr("stroke-width",3);                        
                        d3.selectAll('.horLine'+i2+'id'+_parent._idnum).attr("opacity",1);

                        if(lg._selectedBar==-1){
                            d3.selectAll('.maxLabel').attr("opacity",0);
                            d3.selectAll('.sortLabel').style("font-weight","normal");
                            d3.selectAll('.maxLabel'+i+'id'+_parent._idnum).attr("opacity",1);
                            d3.selectAll('.sortLabel'+i+'id'+_parent._idnum).style("font-weight","bold");
                            lg.mapRegister.colorMap(dataSubset,v);
                        }

                    })
                    .on("mouseout",function(d,i2){
                        d3.selectAll('.horLine'+i2+'id'+_parent._idnum).attr("opacity",0);
                        d3.selectAll('.dashgeom'+d.join).attr("stroke-width",1);  
                    })
                    .on('click',function(d,i2){
                        if(lg._selectedBar ==i){
                            lg._selectedBar = -1;
                        } else {
                            d3.selectAll('.maxLabel'+lg._selectedBar+'id'+_parent._idnum).attr("opacity",0);
                            d3.selectAll('.sortLabel'+lg._selectedBar+'id'+_parent._idnum).style("font-weight","normal");                          
                            lg._selectedBar = i;
                            d3.selectAll('.maxLabel'+lg._selectedBar+'id'+_parent._idnum).attr("opacity",1);
                            d3.selectAll('.sortLabel'+lg._selectedBar+'id'+_parent._idnum).style("font-weight","bold");
                            lg.mapRegister.colorMap(dataSubset,v);
                        };
                    });

                d3.selectAll('.selectbars'+i+'id'+_parent._idnum).on('mouseover.something', tips[i].show).on('mouseout.something', tips[i].hide);
                d3.selectAll('.sortLabel').on('mouseover.something', tipsort.show).on('mouseout.something', tipsort.hide);         
                                                       
            })
            
            var g = _grid.append("g");
        
            g.selectAll("line")
                .data(data)
                .enter()
                .append("line")
                .attr("x1", -_parent._properties.margin.left)
                .attr("y1",function(d,i){return _parent._properties.boxHeight*(i)+(i-0.5)*_parent._vWhiteSpace})
                .attr("x2", _parent._properties.width-_parent._hWhiteSpace)
                .attr("y2", function(d,i){return _parent._properties.boxHeight*(i)+(i-0.5)*_parent._vWhiteSpace})
                .attr("opacity",0)
                .attr("class",function(d,i){return "horLine"+i+'id'+_parent._idnum+" horLineTop horLineTopid"+_parent._idnum})
                .attr("stroke-width", 1)
                .attr("stroke", "#ddd");

            var g = _grid.append("g");

            g.selectAll("line")
                .data(data)
                .enter()
                .append("line")
                .attr("x1", -_parent._properties.margin.left)
                .attr("y1", function(d,i){return _parent._properties.boxHeight*(i+1)+(i+0.5)*_parent._vWhiteSpace})
                .attr("x2", _parent._properties.width-_parent._hWhiteSpace)
                .attr("y2", function(d,i){return _parent._properties.boxHeight*(i+1)+(i+0.5)*_parent._vWhiteSpace})
                .attr("opacity",0)
                .attr("class",function(d,i){return "horLine"+i+'id'+_parent._idnum+" horLineBot horLineBotid"+_parent._idnum})
                .attr("stroke-width", 1)
                .attr("stroke", "#ddd");

            _grid.append("g")
                .selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(function(d){
                    return d[nameAttr];
                })        
                .attr("x", function(d) {
                    return 5-_parent._properties.margin.left;
                })
                .attr("y", function(d,i) {
                    return _parent._properties.boxHeight*(i+0.5)+i*_parent._vWhiteSpace;
                })
                .attr('class','nameLabels nameLabelsid'+_parent._idnum);        
                    
        }

        this._update = function(data,columns,sortBy,nameAttr){
            var _parent = this;
            data.sort(function(a, b) {
                    if(sortBy._valueAccessor(a[sortBy._dataName])==null || isNaN(sortBy._valueAccessor(a[sortBy._dataName])) || sortBy._valueAccessor(a[sortBy._dataName])===''){
                        return 1;
                    }
                    if(sortBy._valueAccessor(b[sortBy._dataName])==null || isNaN(sortBy._valueAccessor(b[sortBy._dataName])) || sortBy._valueAccessor(b[sortBy._dataName])===''){
                        return -1;
                    }                    
                    return parseFloat(sortBy._valueAccessor(b[sortBy._dataName]))-parseFloat(sortBy._valueAccessor(a[sortBy._dataName]));
                });
            data.forEach(function(d,i){
                d.pos = i;
            });

            data.sort(function(a, b) {
                return a[_parent._nameAttr].localeCompare(b[_parent._nameAttr]);
            });         

            columns.forEach(function(v,i){

                var newData = [];

                data.forEach(function(d,i){               
                     var nd = {};      
                     nd.pos = d.pos;       
                     nd.join = d[_parent._joinAttr];       
                     nd.value = d[v._dataName];        
                     newData.push(nd);     
                });
                d3.selectAll(".bars"+i+'id'+_parent._idnum)
                    .data(newData)                  
                    .transition()
                    .duration(750)
                    .attr("x", function(d,i2){return _parent._properties.boxWidth*i+i*_parent._hWhiteSpace})
                    .attr("y", function(d,i2){return _parent._properties.boxHeight*d.pos+d.pos*_parent._vWhiteSpace});

                d3.selectAll(".selectbars"+i+'id'+_parent._idnum)
                    .data(newData)                  
                    .transition()
                    .duration(750)
                    .attr("x", function(d,i2){return _parent._properties.boxWidth*i+i*_parent._hWhiteSpace})
                    .attr("y", function(d,i2){return _parent._properties.boxHeight*d.pos+d.pos*_parent._vWhiteSpace});                  

            });

            d3.selectAll(".horLineTopid"+_parent._idnum)
                .attr("y1",function(d,i){return _parent._properties.boxHeight*(d.pos)+(d.pos-0.5)*_parent._vWhiteSpace})
                .attr("y2",function(d,i){return _parent._properties.boxHeight*(d.pos)+(d.pos-0.5)*_parent._vWhiteSpace});

            d3.selectAll(".horLineBotid"+_parent._idnum)
                .attr("y1",function(d,i){return _parent._properties.boxHeight*(d.pos+1)+(d.pos+0.5)*_parent._vWhiteSpace})
                .attr("y2",function(d,i){return _parent._properties.boxHeight*(d.pos+1)+(d.pos+0.5)*_parent._vWhiteSpace});             


            d3.selectAll(".nameLabelsid"+_parent._idnum)             
                .transition()
                .duration(750)
                .attr("y",function(d){
                    return _parent._properties.boxHeight*(d.pos+0.5)+d.pos*_parent._vWhiteSpace;
                });
        }        
    }   
}

d3.tip=function(){function t(t){v=d(t),w=v.createSVGPoint(),document.body.appendChild(g)}function e(){return"n"}function n(){return[0,0]}function r(){return" "}function o(){var t=y();return{top:t.n.y-g.offsetHeight,left:t.n.x-g.offsetWidth/2}}function s(){var t=y();return{top:t.s.y,left:t.s.x-g.offsetWidth/2}}function u(){var t=y();return{top:t.e.y-g.offsetHeight/2,left:t.e.x}}function f(){var t=y();return{top:t.w.y-g.offsetHeight/2,left:t.w.x-g.offsetWidth}}function l(){var t=y();return{top:t.nw.y-g.offsetHeight,left:t.nw.x-g.offsetWidth}}function i(){var t=y();return{top:t.ne.y-g.offsetHeight,left:t.ne.x}}function a(){var t=y();return{top:t.sw.y,left:t.sw.x-g.offsetWidth}}function c(){var t=y();return{top:t.se.y,left:t.e.x}}function m(){var t=document.createElement("div");return t.style.position="absolute",t.style.display="none",t.style.boxSizing="border-box",t}function d(t){return t=t.node(),"svg"==t.tagName.toLowerCase()?t:t.ownerSVGElement}function y(){var t=d3.event.target,e={},n=t.getScreenCTM(),r=t.getBBox(),o=r.width,s=r.height,u=r.x,f=r.y,l=document.body.scrollTop,i=document.body.scrollLeft;return document.documentElement&&document.documentElement.scrollTop&&(l=document.documentElement.scrollTop,i=document.documentElement.scrollLeft),w.x=u+i,w.y=f+l,e.nw=w.matrixTransform(n),w.x+=o,e.ne=w.matrixTransform(n),w.y+=s,e.se=w.matrixTransform(n),w.x-=o,e.sw=w.matrixTransform(n),w.y-=s/2,e.w=w.matrixTransform(n),w.x+=o,e.e=w.matrixTransform(n),w.x-=o/2,w.y-=s/2,e.n=w.matrixTransform(n),w.y+=s,e.s=w.matrixTransform(n),e}var p=e,h=n,x=r,g=m(),v=null,w=null;t.show=function(){var e,n=x.apply(this,arguments),r=h.apply(this,arguments),o=p.apply(this,arguments),s=d3.select(g),u=0;for(s.html(n).style("display","block");u--;)s.classed(b[u],!1);return e=T.get(o).apply(this),s.classed(o,!0).style({top:e.top+r[0]+"px",left:e.left+r[1]+"px"}),t},t.hide=function(){return g.style.display="none",g.innerHTML="",t},t.attr=function(e,n){return arguments.length<2?d3.select(g).attr(e):(d3.select(g).attr(e,n),t)},t.style=function(e,n){return arguments.length<2?d3.select(g).style(e):(d3.select(g).style(e,n),t)},t.direction=function(e){return arguments.length?(p=null==e?e:d3.functor(e),t):p},t.offset=function(e){return arguments.length?(h=null==e?e:d3.functor(e),t):h},t.html=function(e){return arguments.length?(x=null==e?e:d3.functor(e),t):x};var T=d3.map({n:o,s:s,e:u,w:f,nw:l,ne:i,sw:a,se:c}),b=T.keys();return t};
