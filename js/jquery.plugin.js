
function xtab(tabid,tabclass){
			jQuery('.'+tabclass).hide();
			jQuery.cookie('seevn_xtab',tabid);
			jQuery('#'+tabid).show("slow");
}
function seevn_translate(lang)
{
jQuery('body').translate(lang, { 

not: 'select, pre,.menu_left,h2,h3',
complete: function(translation){ alert('Translation completed'); }

});
jQuery.cookie('seevn_translate',lang);
}
function locationpage(xthis){
var i = xthis.selectedIndex;if(i==0)return;
window.location.href = xthis[i].value;
};
// Cookie //////////////////////////////////////////////////////////////////////////////////////////////////////////
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { 
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
// Slide //////////////////////////////////////////////////////////////////////////////////////////////////////////
(function(jQuery){  

    jQuery.fn.xslide = function(vars) {       
        
        var element     = this;
        var timeOut     = (vars.timeOut != undefined) ? vars.timeOut : 4000;
        var current     = null;
        var timeOutFn   = null;
        var faderStat   = true;
        var mOver       = false;
        var items       = jQuery("#" + element[0].id + "Content ." + element[0].id + "Image");
        var itemsSpan   = jQuery("#" + element[0].id + "Content ." + element[0].id + "Image span");
            
        items.each(function(i) {
    
            jQuery(items[i]).mouseover(function() {
               mOver = true;
            });
            
            jQuery(items[i]).mouseout(function() {
                mOver   = false;
                fadeElement(true);
            });
            
        });
        
        var fadeElement = function(isMouseOut) {
            var thisTimeOut = (isMouseOut) ? (timeOut/2) : timeOut;
            thisTimeOut = (faderStat) ? 10 : thisTimeOut;
            if(items.length > 0) {
                timeOutFn = setTimeout(makeSlider, thisTimeOut);
            } else {
                console.log("Poof..");
            }
        }
        
        var makeSlider = function() {
            current = (current != null) ? current : items[(items.length-1)];
            var currNo      = jQuery.inArray(current, items) + 1
            currNo = (currNo == items.length) ? 0 : (currNo - 1);
            var newMargin   = jQuery(element).width() * currNo;
            if(faderStat == true) {
                if(!mOver) {
                    jQuery(items[currNo]).fadeIn((timeOut/6), function() {
                        if(jQuery(itemsSpan[currNo]).css('bottom') == 0) {
                            jQuery(itemsSpan[currNo]).slideUp((timeOut/6), function() {
                                faderStat = false;
                                current = items[currNo];
                                if(!mOver) {
                                    fadeElement(false);
                                }
                            });
                        } else {
                            jQuery(itemsSpan[currNo]).slideDown((timeOut/6), function() {
                                faderStat = false;
                                current = items[currNo];
                                if(!mOver) {
                                    fadeElement(false);
                                }
                            });
                        }
                    });
                }
            } else {
                if(!mOver) {
                    if(jQuery(itemsSpan[currNo]).css('bottom') == 0) {
                        jQuery(itemsSpan[currNo]).slideDown((timeOut/6), function() {
                            jQuery(items[currNo]).fadeOut((timeOut/6), function() {
                                faderStat = true;
                                current = items[(currNo+1)];
                                if(!mOver) {
                                    fadeElement(false);
                                }
                            });
                        });
                    } else {
                        jQuery(itemsSpan[currNo]).slideUp((timeOut/6), function() {
                        jQuery(items[currNo]).fadeOut((timeOut/6), function() {
                                faderStat = true;
                                current = items[(currNo+1)];
                                if(!mOver) {
                                    fadeElement(false);
                                }
                            });
                        });
                    }
                }
            }
        }
        
        makeSlider();

    };  

})(jQuery); 


// Translate /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
;(function(jQuery){

function Nct(){}

Nct.prototype = {
	init: function(jq, o){
		this.textArray = [];
		this.elements = [];
		this.options = o;
		this.jquery = jq;
		this.n = -1;
		if(o.async === true)
			o.async = 2;
		
		if(o.not){
			jq = jq.not(o.not);
			jq = jq.add( jq.find("*").not(o.not) ).not( jQuery(o.not).find("*") );
		}else
			jq = jq.add( jq.find("*") );

		this.jq = jq;
		this.jql = this.jq.length;
		return this.process();

	},

	process: function(){
		this.n++;
		var that = this, o = this.options, text = "", hasTextNode = false,
			hasChildNode = false, el = this.jq[this.n], e, c, ret;
		
		if(this.n === this.jql){
			ret = this.jquery.pushStack(this.elements, "nodesContainingText");
			o.complete.call(ret, ret, this.textArray);
			
			if(o.returnAll === false && o.walk === false)
				return this.jquery;
			return ret;
		}
		
		if(!el)
			return this.process();
		e=jQuery(el);

		var nodeName = el.nodeName.toUpperCase(),
			type = nodeName === "INPUT" && jQuery.attr(el, "type").toLowerCase();
		
		if( ({SCRIPT:1, NOSCRIPT:1, STYLE:1, OBJECT:1, IFRAME:1})[ nodeName ] )
			return this.process();
		
		if(typeof o.subject === "string"){
			text=e.attr(o.subject);
		}else{	
			if(o.altAndVal && (nodeName === "IMG" || type === "image" ) )
				text = e.attr("alt");
			else if( o.altAndVal && ({text:1, button:1, submit:1})[ type ] )
				text = e.val();
			else if(nodeName === "TEXTAREA")
				text = e.val();
			else{
				//check childNodes:
				c = el.firstChild;
				if(o.walk !== true)
					hasChildNode = true;
				else{
					while(c){
						if(c.nodeType == 1){
							hasChildNode = true;
							break;
						}
						c=c.nextSibling;
					}
				}

				if(!hasChildNode)
					text = e.text();
				else{//check textNodes:
					if(o.walk !== true)
						hasTextNode = true;
					
					c=el.firstChild;
					while(c){
						if(c.nodeType == 3 && c.nodeValue.match(/\S/) !== null){//textnodes with text
							/*jslint skipLines*/
							if(c.nodeValue.match(/<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/) !== null){
								if(c.nodeValue.match(/(\S+(?=.*<))|(>(?=.*\S+))/) !== null){
									hasTextNode = true;
									break;
								}
							}else{
								hasTextNode = true;
								break;
							}
							/*jslint skipLinesEnd*/
						}
						c = c.nextSibling;
					}

					if(hasTextNode){//remove child nodes from jq
						//remove scripts:
						text = e.html();
						/*jslint skipLines*/
						text = o.stripScripts ? text.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "") : text;
						/*jslint skipLinesEnd*/
						this.jq = this.jq.not( e.find("*") );
					}
				}
			}
		}

		if(!text)
			return this.process();
		this.elements.push(el);
		this.textArray.push(text);

		o.each.call(el, this.elements.length - 1, el, text);
		
		if(o.async){
			setTimeout(function(){that.process();}, o.async);
			return this.jquery;
		}else
			return this.process();
		
	}
};

var defaults = {
	not: "",
	async: false,
	each: function(){},
	complete: function(){},
	comments: false,
	returnAll: true,
	walk: true,
	altAndVal: false,
	subject: true,
	stripScripts: true
};

jQuery.fn.nodesContainingText = function(o){
	o = jQuery.extend({}, defaults, jQuery.fn.nodesContainingText.defaults, o);
	return new Nct().init(this, o);
};

jQuery.fn.nodesContainingText.defaults = defaults;

})(jQuery);



;(function(jQuery){
		   
function jQueryfunction(){}

var True = true, False = false, undefined, replace = "".replace,
	Str = String, Fn = Function, Obj = Object,
	GL, GLL, toLangCode, inverseLanguages = {},
	loading, readyList = [],
	defaults = {
		from: "",
		to: "",
		start: jQueryfunction,
		error: jQueryfunction,
		each: jQueryfunction,
		complete: jQueryfunction,
		onTimeout: jQueryfunction,
		timeout: 0,
		
		stripComments: True,
		stripWhitespace: True,
		stripScripts: True,
		separators: /\.\?\!;:/,
		limit: 1750,
		

		walk: True,
		returnAll: False,
		replace: True,
		rebind: True,
		data: True,
		setLangAttr: False,
		subject: True,
		not: "",
		altAndVal:True,
		async: False,
		toggle: False,
		fromOriginal: True,
		
		parallel: false
		//,response: jQueryfunction
		
	};


function loaded(){
	jQuery.translate.GL = GL = google.language;
	jQuery.translate.GLL = GLL = GL.Languages;
	toLangCode = jQuery.translate.toLanguageCode;
	
	jQuery.each(GLL, function(l, lc){
		inverseLanguages[ lc.toUpperCase() ] = l;
	});
	
	jQuery.translate.isReady = True;
	var fn;
	while((fn = readyList.shift())) fn();
}

function filter(obj, fn){
	var newObj = {};
	jQuery.each(obj, function(lang, langCode){
		if( fn(langCode, lang) === True) newObj[ lang ] = langCode;
	});
	return newObj;
}

function bind(fn, thisObj, args){
	return function(){
		return fn.apply(thisObj === True ? arguments[0] : thisObj, args || arguments);
	};
}

function isSet(e){
	return e !== undefined;
}

function validate(_args, overload, error){
	var matched, obj = {}, args = jQuery.grep(_args, isSet);
	
	jQuery.each(overload, function(_, el){
		var matches = jQuery.grep(el[0], function(e, i){
				return isSet(args[i]) && args[i].constructor === e;
			}).length;
		if(matches === args.length && matches === el[0].length && (matched = True)){
			jQuery.each(el[1], function(i, prop){
				obj[prop] = args[i];
			});
			return False;
		}
	});
	//TODO
	if(!matched) throw error;
	return obj;
}


function getOpt(args0, _defaults){
	//args0=[].slice.call(args0, 0)
	var args = validate(args0 , jQuery.translate.overload, "jQuery.translate: Invalid arguments" ),
		o = args.options || {};
	delete args.options;
	o = jQuery.extend({}, defaults, _defaults, jQuery.extend(o, args));
	
	if(o.fromOriginal) o.toggle = True;
	if(o.toggle) o.data = True;
	if(o.async === True) o.async = 2;
	
	return o;
}


function T(){
	//copy over static methods during each instantiation
	//for backward compatibility and access inside callback functions
	this.extend(jQuery.translate);
	delete this.defaults;
	delete this.fn;
}

T.prototype = {
	version: "1.4.6",
	
	_init: function(t, o){
		var separator = o.separators.source || o.separators,
			isString = this.isString = typeof t === "string",
			lastpos = 0, substr;
		
		jQuery.each(["stripComments", "stripScripts", "stripWhitespace"], function(i, name){
			var fn = jQuery.translate[name];
			if( o[name] )
				t = isString ? fn(t) : jQuery.map(t, fn);
		});

		this.rawSource = "<div>" + (isString ? t : t.join("</div><div>")) + "</div>";
		this._m3 = new RegExp("[" + separator + "](?![^" + separator + "]*[" + separator + "])");
		this.options = o;
		this.from = o.from = toLangCode(o.from) || "";
		this.to = o.to = toLangCode(o.to) || "";
		this.source = t;
		this.rawTranslation = "";
		this.translation = [];
		this.i = 0;
		this.stopped = False;
		this.elements = o.nodes;
		
		//this._nres = 0;
		//this._progress = 0;
		this._i = -1; //TODO: rename
		this.rawSources = [];
		
		while(True){
			substr = this.truncate( this.rawSource.substr(lastpos), o.limit);
			if(!substr) break;
			this.rawSources.push(substr);
			lastpos += substr.length;
		}
		this.queue = new Array(this.rawSources.length);
		this.done = 0;
		
		o.start.call(this, t , o.from, o.to, o);
		
		if(o.timeout)
			this.timeout = setTimeout(bind(o.onTimeout, this, [t, o.from, o.to, o]), o.timeout);
		
		(o.toggle && o.nodes) ?	
			(o.textNodes ? this._toggleTextNodes() : this._toggle()) : 
			this._process();
	},
	
	_process: function(){
		if(this.stopped)
			return;
		var o = this.options,
			i = this.rawTranslation.length,
			lastpos, subst, divst, divcl;
		var that = this;
		
		while( (lastpos = this.rawTranslation.lastIndexOf("</div>", i)) > -1){

			i = lastpos - 1;
			subst = this.rawTranslation.substr(0, i + 1);
			/*jslint skipLines*/		
			divst = subst.match(/<div[> ]/gi);	
			divcl = subst.match(/<\/div>/gi);
			/*jslint skipLinesEnd*/
			
			divst = divst ? divst.length : 0;
			divcl = divcl ? divcl.length : 0;
			
			if(divst !== divcl + 1) continue; //if there are some unclosed divs

			var divscompl = jQuery( this.rawTranslation.substr(0, i + 7) ), 
				divlen = divscompl.length, 
				l = this.i;
			
			if(l === divlen) break; //if no new elements have been completely translated
			
			divscompl.slice(l, divlen).each( bind(function(j, e){
				if(this.stopped)
					return False;
				var tr = jQuery.trim(jQuery(e).html()), i = l + j, src = this.source,
					from = !this.from && this.detectedSourceLanguage || this.from;
				this.translation[i] = tr;//create an array for complete callback
				this.isString ? this.translation = tr : src = this.source[i];
				
				o.each.call(this, i, tr, src, from, this.to, o);
				
				this.i++;
			}, this));
			
			break;
		}
		
		if(this.rawSources.length - 1 == this._i)
			this._complete();
		
		var _translate = bind(this._translate, this);
		
		if(o.parallel){
			if(this._i < 0){
				if(!o.parallel){
					jQuery.each(this.rawSources, _translate);
				}else{
					var j = 0, n = this.rawSources.length;
					function seq(){
						_translate();
						if(j < n)
							setTimeout( seq, o.parallel );
					}
					seq();
				}
			}
		}else
			_translate();
			
	},
	
	_translate: function(){
		this._i++;		
		var i = this._i, src = this.rawSourceSub = this.rawSources[i];
		if(!src) return;
		
		GL.translate(src, this.from, this.to, bind(function(result){
			//this._progress = 100 * (++this._nres) / this.rawSources.length;
			//this.options.response.call(this, this._progress, result);
			if(result.error)
				return this.options.error.call(this, result.error, this.rawSourceSub, this.from, this.to, this.options);
			
			this.queue[i] = result.translation || this.rawSourceSub;
			this.detectedSourceLanguage = result.detectedSourceLanguage;
			this._check();
		}, this));

	},
	
	_check: function(){
		if(!this.options.parallel){
			this.rawTranslation += this.queue[this._i];
			this._process();
			return;
		}
		
		var done = 0;
		jQuery.each(this.queue, function(i, n) {
			if (n != undefined) done = i;
			else return false;
		});			
		
		if ((done > this.done) || (done === this.queue.length - 1)) {
			for(var i = 0; i <= done; i++)
				this.rawTranslation += this.queue[i];
			this._process();
		}
		this.done = done;
		
	},
	
	_complete: function(){
		clearTimeout(this.timeout);

		this.options.complete.call(this, this.translation, this.source, 
			!this.from && this.detectedSourceLanguage || this.from, this.to, this.options);
	},
	
	stop: function(){
		if(this.stopped)
			return this;
		this.stopped = True;
		this.options.error.call(this, {message:"stopped"});
		return this;
	}
};



jQuery.translate = function(t, a){
	if(t == undefined)
		return new T();
	if( jQuery.isFunction(t) )
		return jQuery.translate.ready(t, a);
	var that = new T();
	
	var args = [].slice.call(arguments, 0);
	args.shift();
	return jQuery.translate.ready( bind(that._init, that, [t, getOpt(args, jQuery.translate.defaults)] ), False, that );
};


jQuery.translate.fn = jQuery.translate.prototype = T.prototype;

jQuery.translate.fn.extend = jQuery.translate.extend = jQuery.extend;


jQuery.translate.extend({
	
	_bind: bind,
	
	_filter: filter,
	
	_validate: validate,
	
	_getOpt: getOpt,
	
	_defaults: defaults, //base defaults used by other components as well //TODO
	
	defaults: jQuery.extend({}, defaults),
	
	capitalize: function(t){ return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); },
	
	truncate: function(text, limit){
		var i, m1, m2, m3, m4, t, encoded = encodeURIComponent( text );
		
		for(i = 0; i < 10; i++){
			try { 
				t = decodeURIComponent( encoded.substr(0, limit - i) );
			} catch(e){ continue; }
			if(t) break;
		}
		
		return ( !( m1 = /<(?![^<]*>)/.exec(t) ) ) ? (  //if no broken tag present
			( !( m2 = />\s*jQuery/.exec(t) ) ) ? (  //if doesn't end with '>'
				( m3 = this._m3.exec(t) ) ? (  //if broken sentence present
					( m4 = />(?![^>]*<)/.exec(t) ) ? ( 
						m3.index > m4.index ? t.substring(0, m3.index+1) : t.substring(0, m4.index+1)
					) : t.substring(0, m3.index+1) ) : t ) : t ) : t.substring(0, m1.index);
	},

	getLanguages: function(a, b){
		if(a == undefined || (b == undefined && !a))
			return GLL;
		
		var newObj = {}, typeof_a = typeof a,
			languages = b ? jQuery.translate.getLanguages(a) : GLL,
			filterArg = ( typeof_a  === "object" || typeof_a  === "function" ) ? a : b;
				
		if(filterArg)
			if(filterArg.call) //if it's a filter function
				newObj = filter(languages, filterArg);
			else //if it's an array of languages
				for(var i = 0, length = filterArg.length, lang; i < length; i++){
					lang = jQuery.translate.toLanguage(filterArg[i]);
					if(languages[lang] != undefined)
						newObj[lang] = languages[lang];
				}
		else //if the first argument is true -> only translatable languages
			newObj = filter(GLL, GL.isTranslatable);
		
		return newObj;
	},
	

	toLanguage: function(a, format){
		var u = a.toUpperCase();
		var l = inverseLanguages[u] || 
			(GLL[u] ? u : undefined) || 
			inverseLanguages[(jQuery.translate.languageCodeMap[a.toLowerCase()]||"").toUpperCase()];
		return l == undefined ? undefined :
			format === "lowercase" ? l.toLowerCase() : format === "capitalize" ? jQuery.translate.capitalize(l) : l;				
	},
	
	toLanguageCode: function(a){
		return GLL[a] || 
			GLL[ jQuery.translate.toLanguage(a) ] || 
			jQuery.translate.languageCodeMap[a.toLowerCase()];
	},
		
	same: function(a, b){
		return a === b || toLangCode(a) === toLangCode(b);
	},
		
	isTranslatable: function(l){
		return GL.isTranslatable( toLangCode(l) );
	},

	//keys must be lower case, and values must equal to a 
	//language code specified in the Language API
	languageCodeMap: {
		"pt": "pt-PT",
		"he": "iw",
		"zlm": "ms",
		"zh-hans": "zh-CN",
		"zh-hant": "zh-TW"
		//,"zh-sg":"zh-CN"
		//,"zh-hk":"zh-TW"
		//,"zh-mo":"zh-TW"
	},
	
	//use only language codes specified in the Language API
	isRtl: {
		"ar": True,
		"iw": True,
		"fa": True,
		"ur": True,
		"yi": True
	},
	
	getBranding: function(){
		return jQuery( GL.getBranding.apply(GL, arguments) );
	},
	
	load: function(key, version){
		loading = True;
		function _load(){ 
			google.load("language", version || "1", {"callback" : loaded});
		}
		
		if(typeof google !== "undefined" && google.load)
			_load();
		else
			jQuery.getScript("http://www.google.com/jsapi" + (key ? "?key=" + key : "") + '?hl=vi', _load);
		return jQuery.translate;
	},
	
	ready: function(fn, preventAutoload, that){
		jQuery.translate.isReady ? fn() : readyList.push(fn);
		if(!loading && !preventAutoload)
			jQuery.translate.load();
		return that || jQuery.translate;
	},
	
	isReady: False,
	
	overload: [
	    [[],[]],
		[[Str, Str, Obj],	["from", "to", "options"]	],
		[[Str, Obj], 		["to", "options"]			],
		[[Obj], 			["options"]					],
		[[Str, Str], 		["from", "to"]				],
		[[Str], 			["to"]						],
		[[Str, Str, Fn],	["from", "to", "complete"]	],
		[[Str, Fn], 		["to", "complete"]			]
		 //TODO
		//,[[Str, Str, Fn, Fn], ["from", "to", "each", "complete"]]
	]
	/*jslint skipLines*/
	,
	//jslint doesn't seem to be able to parse some regexes correctly if used on the server,
	//however it works fine if it's run on the command line: java -jar rhino.jar jslint.js file.js
	stripScripts: bind(replace, True, [/<script[^>]*>([\s\S]*?)<\/script>/gi, ""]),
	
	stripWhitespace: bind(replace, True, [/\s\s+/g, " "]),
	
	stripComments: bind(replace, True, [/<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/g, ""])
	/*jslint skipLinesEnd*/
});


})(jQuery);

/*!-
 * jQuery.fn.nodesContainingText adapter for the jQuery Translate plugin 
 * Version: 1.4.6
 * http://code.google.com/p/jquery-translate/
 */
;(function(jQuery){

var True = true,
	isInput = {text:True, button:True, submit:True},
	dontCopyEvents = {SCRIPT:True, NOSCRIPT:True, STYLE:True, OBJECT:True, IFRAME:True},
	jQueryfly = jQuery([]);

jQueryfly.length = 1;

function getDoc(node){
    while (node && node.nodeType != 9)
    	node = node.parentNode;
    return node;
}

function toggleDir(e, dir){
	var align = e.css("text-align");
	e.css("direction", dir);
	if(align === "right") e.css("text-align", "left");
	if(align === "left") e.css("text-align", "right");
}

function getType(el, o){
	var nodeName = el.nodeName.toUpperCase(),
		type = nodeName === 'INPUT' && jQuery.attr(el, 'type').toLowerCase();
	o = o || {altAndVal:True, subject:True};
	return typeof o.subject === "string" ? o.subject :
		o.altAndVal && (nodeName === 'IMG' || type === "image" )  ? "alt" :
		o.altAndVal && isInput[ type ] ? "jQueryval" :
		nodeName === "TEXTAREA" ? "jQueryval" : "jQueryhtml";
}

jQuery.translate.fn._toggle = function(){
	var o = this.options, to = o.to, stop;
	
	this.elements.each(jQuery.translate._bind(function(i, el){
		this.i = i;
		var e = jQuery(el), tr = jQuery.translate.getData(e, to, o);
		
		if(!tr) return !(stop = True);
		
		this.translation.push(tr);

		o.each.call(this, i, el, tr, this.source[i], this.from, to, o);
		//'from' will be undefined if it wasn't set
	}, this));
	
	!stop ? this._complete() : this._process();
	//o.complete.call(this, o.nodes, this.translation, this.source, this.from, this.to, o)
};



jQuery.translate.extend({
	_getType: getType,
	
	each: function(i, el, t, s, from, to, o){
		jQueryfly[0] = el;
		jQuery.translate.setData(jQueryfly, to, t, from, s, o);
		jQuery.translate.replace(jQueryfly, t, to, o);
		jQuery.translate.setLangAttr(jQueryfly, to, o);
	},
	
	getData: function(e, lang, o){
		var el = e[0] || e, data = jQuery.data(el, "translation");
		return data && data[lang] && data[lang][ getType(el, o) ];
	},
	
	setData: function(e, to, t, from, s, o){
		if(o && !o.data) return;
		
		var el = e[0] || e,
			type = getType(el, o),
			data = jQuery.data(el, "translation");
		
		data = data || jQuery.data(el, "translation", {});
		(data[from] = data[from] || {})[type] = s;
		(data[to] = data[to] || {})[type] = t;
	},
	
	
	replace: function(e, t, to, o){
		
		if(o && !o.replace) return;
		
		if(o && typeof o.subject === "string")
			return e.attr(o.subject, t);

		var el = e[0] || e, 
			nodeName = el.nodeName.toUpperCase(),
			type = nodeName === 'INPUT' && jQuery.attr(el, 'type').toLowerCase(),
			isRtl = jQuery.translate.isRtl,
			lang = jQuery.data(el, "lang");
		
		if( lang === to )
			return;
		
		if( isRtl[ to ] !== isRtl[ lang || o && o.from ] ){
			if( isRtl[ to ] )
				toggleDir(e, "rtl");
			else if( e.css("direction") === "rtl" )
				toggleDir(e, "ltr");
		}
		
		if( (!o || o.altAndVal) && (nodeName === 'IMG' || type === "image" ) )
			e.attr("alt", t);
		else if( nodeName === "TEXTAREA" || (!o || o.altAndVal) && isInput[ type ] )
			e.val(t);
		else{
			if(!o || o.rebind){
				this.doc = this.doc || getDoc(el);
				var origContents = e.find("*").not("script"),
					newElem = jQuery(this.doc.createElement("div")).html(t);
				jQuery.translate.copyEvents( origContents, newElem.find("*") );
				e.html( newElem.contents() );
			}else
				e.html(t);
		}
		
		//used for determining if the text-align property should be changed,
		//it's much faster than setting the "lang" attribute, see bug #13
		jQuery.data(el, "lang", to);
	},
	
	setLangAttr: function(e, to, o){	
		if(!o || o.setLangAttr)
			e.attr((!o || o.setLangAttr === True) ? "lang" : o.setLangAttr, to);
	},
	
	copyEvents: function(from, to){
		to.each(function(i, to_i){
			var from_i = from[i];
			if( !to_i || !from_i ) //in some rare cases the translated html structure can be slightly different
				return false;
			if( dontCopyEvents[ from_i.nodeName.toUpperCase() ])
				return True;
			var events = jQuery.data(from_i, "events");
			if(!events)
				return True;
			for(var type in events)
				for(var handler in events[type])
					jQuery.event.add(to_i, type, events[type][handler], events[type][handler].data);
		});
	}
	
});


jQuery.fn.translate = function(a, b, c){
	var o = jQuery.translate._getOpt(arguments, jQuery.fn.translate.defaults),
		ncto = jQuery.extend( {}, jQuery.translate._defaults, jQuery.fn.translate.defaults, o,
			{ complete:function(e,t){jQuery.translate(function(){
				
				var from = jQuery.translate.toLanguageCode(o.from);

				if(o.fromOriginal)
					e.each(function(i, el){
						jQueryfly[0] = el;
						var data = jQuery.translate.getData(jQueryfly, from, o);
						if( !data ) return true;
						t[i] = data;
					});
				
				
				var each = o.each;
				
				function unshiftArgs(method){
					return function(){
						[].unshift.call(arguments, this.elements);
						method.apply(this, arguments);
					};
				}
				
				//TODO: set as instance property
				o.nodes = e;
				o.start = unshiftArgs(o.start);
				o.onTimeout = unshiftArgs(o.onTimeout);
				o.complete = unshiftArgs(o.complete);
				
				o.each = function(i){
					var args = arguments;
					if(arguments.length !== 7) //if isn't called from _toggle
						[].splice.call(args, 1, 0, this.elements[i]);
					this.each.apply(this, args);
					each.apply(this, args);
				};
				
				jQuery.translate(t, o);
				
			});},
			
			each: function(){}
		});

	if(this.nodesContainingText)
		return this.nodesContainingText(ncto);
	
	//fallback if nodesContainingText method is not present:
	o.nodes = this;
	jQuery.translate(jQuery.map(this, function(e){ return jQuery(e).html() || jQuery(e).val(); }), o);
	return this;
};

jQuery.fn.translate.defaults = jQuery.extend({}, jQuery.translate._defaults);

})(jQuery);

/*!-
 * TextNode Translator for the jQuery Translate plugin 
 * Version: 1.4.6
 * http://code.google.com/p/jquery-translate/
 */

;(function(jQuery){


function getTextNodes( root, _filter ){

	var nodes = [],
		skip = {SCRIPT:1, NOSCRIPT:1, STYLE:1, IFRAME:1},
		notType = typeof _filter,
		filter = notType === "string" ? function(node){ return !jQuery(node).is(_filter); } :
				 notType === "function" ? _filter :  //e.g. function(node){ return node.nodeName != 'A'; }
				 null;
	
	function recurse(_, root){
		var i = 0, children = root.childNodes, l = children.length, node;
		for(; i < l; i++){
			node = children[i];
			
			if(node.nodeType == 3 && /\S/.test(node.nodeValue))
				nodes.push(node);
			else if( node.nodeType == 1 &&
					!skip[ node.nodeName.toUpperCase() ] && 
					(!filter || filter(node)))
				recurse(null, node);
		}
	}
	
	jQuery.each((root.length && !root.nodeName) ? root : [root], recurse);

	return nodes;
}

function toggleDir(e, dir){
	var align = e.css("text-align");
	e.css("direction", dir);
	if(align === "right") e.css("text-align", "left");
	if(align === "left") e.css("text-align", "right");
}

function setLangAttr(e, to, o){	
	if(!o || o.setLangAttr)
		jQuery(e).attr((!o || o.setLangAttr === true) ? "lang" : o.setLangAttr, to);
}
	
function replace(parent, node, text, to, o){
	if(!o.replace) return;
	var isRtl = jQuery.translate.isRtl,
		lang = jQuery.data(parent, "lang");
	
	if( isRtl[ to ] !== isRtl[ lang || o && o.from ] ){
		var jQueryparent = jQuery(parent);
		if( isRtl[ to ] )
			toggleDir(jQueryparent, "rtl");
		else if( jQueryparent.css("direction") === "rtl" )
			toggleDir(jQueryparent, "ltr");
	}
	
	jQuery.data(parent, "lang", to);
	
	if(text != node.nodeValue){
		var newTextNode = document.createTextNode(text);
		parent.replaceChild(newTextNode, node);
		return newTextNode;
	}
	
	return node;
}

function setData(parent, o, src, trnsl){
	if(o.data){
		var TR = "translation";
		if(!jQuery.data(parent, TR))
			jQuery.data(parent, TR, {});
		
		if(!jQuery.data(parent, TR)[o.from])
			jQuery.data(parent, TR)[o.from] = [];
		[].push.call(jQuery.data(parent, TR)[o.from], src);	
		
		if(!jQuery.data(parent, TR)[o.to])
			jQuery.data(parent, TR)[o.to] = [];
		[].push.call(jQuery.data(parent, TR)[o.to], trnsl);	
	}
}

function getData(parent, lang, that){
	that._childIndex = that._prevParent === parent ? that._childIndex + 1 : 0;
	var tr = jQuery.data(parent, "translation");
	that._prevParent = parent;
	return tr && tr[lang] && tr[lang][that._childIndex];
	
}

function _each(i, textNode, t, s, from, to, o){
	t = t.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'");
	
	var parent = textNode.parentNode;
	setData(parent, o, s, t);
	var newTextNode = replace(parent, textNode, t, to, o);
	setLangAttr(parent, o.to, o);
	
	return newTextNode;
}

jQuery.translateTextNodes = function(root){ 
	var args = [].slice.call(arguments,0);
	args.shift();
	
jQuery.translate(function(){
	var o = jQuery.translate._getOpt(args, jQuery.translateTextNodes.defaults),
		each = o.each,
		nodes = getTextNodes(root, o.not),
		contents = jQuery.map(nodes, function(n){ return n.nodeValue; }),
		from = jQuery.translate.toLanguageCode(o.from),
		obj = {};
	
	o.nodes = nodes;
	o.textNodes = true;
	

	if(o.fromOriginal)
		jQuery.each(nodes, function(i, textNode){
			var data = getData(textNode.parentNode, from, obj);
			if( !data ) return true;
			contents[i] = data;
		});
	
	function unshiftArgs(method){
		return function(){
			[].unshift.call(arguments, this.elements);
			method.apply(this, arguments);
		};
	}
	
	o.start = unshiftArgs(o.start);
	o.onTimeout = unshiftArgs(o.onTimeout);
	o.complete = unshiftArgs(o.complete);
	
	o.each = function(i){
		var args = arguments;
		if(arguments.length !== 7) //if isn't called from _toggle
			[].splice.call(args, 1, 0, this.elements[i]);		
		this.elements[i] = args[1] = _each.apply(this, args);
		
		each.apply(this, args);
	};
	
	jQuery.translate(contents, o);
	
});
};

jQuery.translate.fn._toggleTextNodes = function(){
	var o = this.options, to = o.to, stop;
	
	jQuery.each(this.elements, jQuery.translate._bind(function(i, textNode){
		this.i = i;
		var parent = textNode.parentNode, 
		    tr = getData(parent, to, this);
		
		if(!tr) return !(stop = true);
		
		this.translation.push(tr);
		
		o.each.call(this, i, textNode, tr, this.source[i], this.from, to, o);
		//'from' will be undefined if it wasn't set
	}, this));
	
	!stop ? this._complete() : this._process();
	//o.complete.call(this, this.elements, this.translation, this.source, this.from, this.to, o);
};

jQuery.fn.translateTextNodes = function(a, b, c){
	[].unshift.call(arguments, this);
	jQuery.translateTextNodes.apply(null, arguments);
	return this;
};

jQuery.translateTextNodes.defaults = jQuery.fn.translateTextNodes.defaults = jQuery.extend({}, jQuery.translate._defaults);

})(jQuery);

/*!-
 * Simple user interface extension for the jQuery Translate plugin 
 * Version: 1.4.6
 * http://code.google.com/p/jquery-translate/
 */
;(function(jQuery){

var defaults = {
	tags: ["select", "option"],
	filter: jQuery.translate.isTranslatable,
	label: jQuery.translate.toNativeLanguage || 
		function(langCode, lang){
			return jQuery.translate.capitalize(lang);
		},
	includeUnknown: false
};

jQuery.translate.ui = function(){
	var o = {}, str='', cs='', cl='';
	
	if(typeof arguments[0] === "string")
		o.tags = jQuery.makeArray(arguments);
	else o = arguments[0];
	
	o = jQuery.extend({}, defaults, jQuery.translate.ui.defaults, o);
		
	if(o.tags[2]){
		cs = '<' + o.tags[2] + '>';
		cl = '</' + o.tags[2] + '>';
	}
	
	var languages = jQuery.translate.getLanguages(o.filter);
	if(!o.includeUnknown) delete languages.UNKNOWN;
	
	jQuery.each( languages, function(l, lc){
		str += ('<' + o.tags[1] + " value=" + lc + '>' + cs +
			//jQuery.translate.capitalize(l) + " - " + 
			o.label(lc, l) +
			cl + '</' + o.tags[1] + '>');
	});

	return jQuery('<' + o.tags[0] + ' class="jq-translate-ui">' + str + '</' + o.tags[0] + '>');

};

jQuery.translate.ui.defaults = jQuery.extend({}, defaults);


})(jQuery);

/*!-
 * Progress indicator extension for the jQuery Translate plugin 
 * Version: 1.4.6
 * http://code.google.com/p/jquery-translate/
 */

;jQuery.translate.fn.progress = function(selector, options){
	if(!this.i) this._pr = 0;
	this._pr += this.source[this.i].length;
	var progress = 100 * this._pr / ( this.rawSource.length - ( 11 * (this.i + 1) ) );

	if(selector){
		var e = jQuery(selector);
		if( !this.i && !e.hasClass("ui-progressbar") )
			e.progressbar(options);
		e.progressbar( "option", "value", progress );
	}
	
	return progress;
};

/*!-
 * Native language names extension for the jQuery Translate plugin 
 * Version: 1.4.6
 * http://code.google.com/p/jquery-translate/
 */
;(function(jQuery){
jQuery.translate.extend({

	toNativeLanguage: function(lang){ 
		return jQuery.translate.nativeLanguages[ lang ] || 
			jQuery.translate.nativeLanguages[ jQuery.translate.toLanguageCode(lang) ];
	},
	
	nativeLanguages: {
		"af":"Afrikaans",
		"be":"Đ‘ĐµĐ»Đ°Ñ€ÑƒÑĐºĐ°Ñ",
		"is":"Ăslenska",
		"ga":"Gaeilge",
		"mk":"ĐœĐ°ĐºĐµĐ´Đ¾Đ½ÑĐºĐ¸",
		"ms":"Bahasa Melayu",
		"sw":"Kiswahili",
		"cy":"Cymraeg",
		"yi":"×™×™Ö´×“×™×©",
		
		"sq":"Shqipe",
		"ar":"Ø§Ù„Ø¹Ø±Ø¨ÙØ©",
		"bg":"Đ‘ÑĐ»Đ³Đ°Ñ€ÑĐºĐ¸",
		"ca":"CatalĂ ",
		"zh":"ä¸­æ–‡",
		"zh-CN":"ç®€ä½“ä¸­æ–‡",
		"zh-TW":"ç¹é«”ä¸­æ–‡",
		"hr":"Hrvatski",
		"cs":"ÄŒeÅ¡tina",
		"da":"Dansk",
		"nl":"Nederlands",
		"en":"English",
		"et":"Eesti",
		"tl":"Tagalog",
		"fi":"Suomi",
		"fr":"FranĂ§ais",
		"gl":"Galego",
		"de":"Deutsch",
		"el":"Î•Î»Î»Î·Î½Î¹ÎºÎ¬",
		"iw":"×¢×‘×¨×™×ª",
		"hi":"à¤¹à¤¿à¤¨à¥à¤¦à¥€",
		"hu":"Magyar",
		"id":"Bahasa Indonesia",
		"it":"Italiano",
		"ja":"æ—¥æœ¬èª",
		"ko":"í•œêµ­́–´",
		"lv":"LatvieÅ¡u",
		"lt":"LietuviÅ³",
		"mt":"Malti",
		"no":"Norsk",
		"fa":"ÙØ§Ø±Ø³ÛŒ",
		"pl":"Polski",
		"pt-PT":"PortuguĂªs",
		"ro":"RomĂ¢n",
		"ru":"Đ ÑƒÑÑĐºĐ¸Đ¹",
		"sr":"Đ¡Ñ€Đ¿ÑĐºĐ¸",
		"sk":"SlovenskĂ½",
		"sl":"Slovenski",
		"es":"EspaĂ±ol",
		"sv":"Svenska",
		"th":"à¹„à¸—à¸¢",
		"tr":"TĂ¼rkĂ§e",
		"uk":"Đ£ĐºÑ€Đ°Ñ—Đ½ÑÑŒĐºĐ°",
		"vi":"Tiáº¿ng Viá»‡t"
	}

});

})(jQuery);

/*!-
 * Paralell extension for the jQuery Translate plugin 
 * Version: 1.4.6
 * http://code.google.com/p/jquery-translate/
 */

;(function(jQuery){
jQuery.translate.extend({
	defer: function(){
		return jQuery.translate._bind(jQuery.translate, null, arguments);
	},
	
	run: function(array, finished){
		var count = array.length;
		jQuery.each(array, function(){
			var inst = this(),
				complete = inst.options.complete;
				inst.options.complete = function(){
				complete.apply(this, arguments);
				if(!--count) finished();
				
			};
		});
	}		
});

})(jQuery);

