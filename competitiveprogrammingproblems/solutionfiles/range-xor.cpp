#include <iostream>

//Author: Evan Partidas

using namespace std;
typedef long long ll;

void upd(int tree[], int ind,int delta, int N)
{
	while(ind<=N)
	{
		tree[ind]^=delta;
		ind+=ind&-ind;
	}
}

int sum(int tree[],int ind)
{
	int val = 0;
	while(ind>0)
	{
		val^=tree[ind];
		ind-=ind&-ind;
	}
	return val;
}

int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(0);cout.tie(0);
	int N,Q;
	cin>>N>>Q;
	int arr[N+1]{};
	for(int i=1;i<=N;i++) 
	{
		int x;
		cin>>x;
		upd(arr,i,x,N);
	}
	for(int i=0;i<Q;i++)
	{
		int t,a,b;
		cin>>t>>a>>b;
		if(t==1)
		{
			int ret = sum(arr,b+1)^sum(arr,a);
			cout<<ret<<"\n";
		}
		else
		{
			upd(arr,a+1,b,N);
		}
	}
	return 0;
}
