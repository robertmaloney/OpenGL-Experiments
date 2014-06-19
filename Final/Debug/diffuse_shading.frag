// Fragment shader for per-pixel diffuse shading. The
// teapot is a good object to test this shader, since
// the .obj file includes surface normals.

// The shader computes the dot product between the unit
// surface normal and light direction, which were 
// passed as varying inputs from the vertex shader. The
// result is multiplied with the vertex color, which is 
// accessed through a pre-defined varying variable.

varying vec3 normal, lightDir, camDir;
varying vec4 color;
uniform sampler2D color_texture;

void main()
{		
	//gl_FragColor = gl_LightSource[0].diffuse * max(dot(normal, normalize(lightDir)),0.0) * gl_FrontMaterial.diffuse;		
	//gl_FragColor = vec4(0,1,0,1);
	vec3 r = reflect(lightDir,normal);
	r = normalize(r);
	//gl_FragColor = vec4(0.0,0.0,0.0,0.0) + gl_LightSource[0].specular * pow(max(dot(r, camDir),0.0), gl_FrontMaterial.shininess);
	vec4 greenscreen = vec4(0.0,1.0,0.0,1.0);
	//gl_FragColor = gl_Color;
	if ( color.g >= 0.9 )
	{
		gl_FragColor = vec4(0.1,0.3,0.3,0.1) + gl_LightSource[0].specular * pow(max(dot(r, camDir),0.0), 10);
	}
	else if ( color.r == 0.0 && color.g == 0.0 && color.b == 0.0 ) //texture code
	{
		gl_FragColor = texture2D(color_texture,gl_TexCoord[0].st);// + gl_LightSource[0].diffuse * max(dot(normal, normalize(lightDir)),0.0) * gl_FrontMaterial.diffuse + gl_LightSource[0].specular * pow(max(dot(r, camDir),0.0), gl_FrontMaterial.shininess) * gl_FrontMaterial.specular;
	}
	else
	{
		gl_FragColor = color + gl_LightSource[0].diffuse * max(dot(normal, normalize(lightDir)),0.0) * gl_FrontMaterial.diffuse + gl_LightSource[0].specular * pow(max(dot(r, camDir),0.0), gl_FrontMaterial.shininess) * gl_FrontMaterial.specular;
	}
}
