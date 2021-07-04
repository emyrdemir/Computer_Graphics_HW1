
var gl;
var points = [];
var numSubdivisions = 1;
window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    //var vertices = new Float32Array([-1, 0, -0.5, -1, 0, 0]);
	var vertices = [vec2 (-1,1),
					vec2 (0,-1),
					vec2 (1,1)];
    divideTriange(vertices[0],vertices[1],vertices[2],numSubdivisions);                

	var colors = [vec4 (1.0,0.0,0.0,1.0),
                vec4 (0.0,1.0,0.0,1.0),
                vec4 (0.0,0.0,1.0,1.0)];

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	    // Load the data into the GPU
    
    var cbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(colors), gl.STATIC_DRAW );
	
    // Associate out shader variables with our data buffer
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    render();
};
function triangle(a,b,c,color)
{
    points.push(a,b,c);
   // colors.push(colors[color]);
}

function    divideTriange(a,b,c,count)
{
    if(count === 0){
        triangle(a,b,c);
}   
    else
{
        var ab = mix(a,b,0.5);
        var ac = mix(a,c,0.5);
        var bc = mix(b,c,0.5);

        count--;
        divideTriange(a,ab,ac,count);
        divideTriange(c,ac,bc,count);
        divideTriange(b,bc,ab,count);
}}             


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
