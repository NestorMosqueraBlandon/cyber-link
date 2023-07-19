export const setError = (error: string): string => {
 if(error == 'Invalid credentials'){
  return 'Credenciales invalidas';
 }
 
 if(error == 'accounts validation failed: name: Path `name` is required.'){
  return 'El nombre es requerido';
 }
 
 return ''
}