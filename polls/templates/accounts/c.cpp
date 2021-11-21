#include <iostream>
#include <cmath>

using namespace std; 




//441
/*
int main(){
	int i, j, n,x[3][3], k, l=0;
	cout<<"k=";cin>>k;
	do{
		cout<<"n=";cin>>n;

	}
	while(n<2 || n>3);
	for (i = 0; i < n; i++)
	{
		for (j = 0; j < n; j++)
		{
			cout<<"i=";cin>>*(*(x+i)+j);
			
		}
		
	}
	

	for (i = 0; i <= n-1; i++){
	
		for (j = 0; j <= i-1; j++)
		{
			
			
			if (*(*(x+i)+j)%k==0){
				l++;
				

			}
			
		}
		
	}
	cout<<"l="<<l;


}*/




//443
/*
int main(){
	int i, j, n,x[3][3], l=0, sum=0, k=0;
	
	do{
		cout<<"n=";cin>>n;

	}
	while(n<2 || n>3);
	for (i = 0; i < n; i++)
	{
		for (j = 0; j < n; j++)
		{
			cout<<"i=";cin>>*(*(x+i)+j);
			
		}
		
	}
	

	for (i = 0; i <= n-1; i++){
	
		for (j = 0; j <= i; j++)
		{
			
			
			if (*(*(x+i)+j)%2==0){
				sum += pow(*(*(x+i)+j), 2);
				k++;
				

			}
			
		}
		
	}
	cout<<"l="<<sum/k;


}
*/


//448
/*
int main(){
	int i, j, n,x[3][3], l=0, k=0;
	
	do{
		cout<<"n=";cin>>n;

	}
	while(n<2 || n>3);
	for (i = 0; i < n; i++)
	{
		for (j = 0; j < n; j++)
		{
			cout<<"i=";cin>>*(*(x+i)+j);
			
		}
		
	}
	

	for (i = 0; i <= n-1; i++){
	
		for (j = 0; j <= n-i-1; j++)
		{
			
			
			if (*(*(x+i)+j)==0){
				
				k++;
				

			}
			
		}
		
	}
	cout<<"k="<<k;


}*/

//451
/*
int main(){
	int i, j, n,x[3][3], l=0, k=0;
	
	do{
		cout<<"n=";cin>>n;

	}
	while(n<2 || n>3);
	for (i = 0; i < n; i++)
	{
		for (j = 0; j < n; j++)
		{
			cout<<"i=";cin>>*(*(x+i)+j);
			
		}
		
	}
	

	for (i = 0; i <= n-1; i++){
	
		for (j = n-i-1; j <= n-1; j++)
		{
			
			
			if ((i+j)%2!=0){
				
				k++;
				

			}
			
		}
		
	}
	cout<<"k="<<k;


}
*/

//451
/*
int main(){
	int i, j, n,x[3][3], l=0, k=0;
	
	do{
		cout<<"n=";cin>>n;

	}
	while(n<2 || n>3);
	for (i = 0; i < n; i++)
	{
		for (j = 0; j < n; j++)
		{
			cout<<"i=";cin>>*(*(x+i)+j);
			
		}
		
	}
	

	for (i = 0; i <= n-1; i++){
	
		for (j = n-i-1; j <= n-1; j++)
		{
			
			
			if ((i+j)%2!=0){
				
				k++;
				

			}
			
		}
		
	}
	cout<<"k="<<k;


}
*/


//481
/*
int main()
{
  int m, i, j,  y[3][3], x[9], q = 1, a,b, k=-1;
  do{cout << "m = "; cin >> m;}
  while(m<2 || m>3);
 
  
  
  do{
  cout << "a = "; cin >> a;
  cout << "b = "; cin >> b;}
  while(a>=b);
 
 

  for (i = 0; i < m; i++){
  	for (j = 0; j < m; j++){

      cout<<"y["<< i <<"]["<< j <<"]";cin>>*(*(y+i)+j);
  	}

  }
    
 for (i = 0; i < m; i++){
  	for (j = 0; j < m; j++){

      if(pow(*(*(y+i)+j),2)>=a && pow(*(*(y+i)+j),2)<=b){
      	k++;
      	*(x+k)=*(*(y+i)+j);



      }

  	}
  	
  }
  if (k!=-1){

  for (i = 0; i <= k; i++)
    cout << (*x+i) << " ";

  }else{
  	cout<<"no element";
  }

  return 0;
}
*/


//484
/*
int main()
{
  int m, i, j,  y[3][3], x[3],  k, q = 1;
 
  
  do{cout << "m = "; cin >> m;}
  while(m<2 || m>3);
  
 
 

  for (i = 0; i < m; i++){
  	for (j = 0; j < m; j++){

      cout<<"y["<< i <<"]["<< j <<"]";cin>>*(*(y+i)+j);
     
  	}

  }

  for (i = 0; i < m; i++){
  	for (j = 0; j < m; j++){

       if (i<=j){
       	q*=*(*(y+i)+j);

      	


      }
     
  	}
  	*(x+i) = q;
  	q=1;

  }
  
  

  for (i = 0; i < m; i++)
    cout << *(y+i) << " ";

  

  return 0;
}*/