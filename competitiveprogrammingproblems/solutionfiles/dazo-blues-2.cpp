#include <iostream>

//Author: Evan Partidas

using namespace std;
int N,S;
bool func(int X,int song[],int blow[], int draw[])
{
	int dp[S+1][2*X+1]{};
	dp[0][X]=1;
	int sol = -1;
	for(int i=1;i<=S;i++)
	{
		int note = song[i-1];
		for(int j=0;j<2*X+1;j++)
		{
			if(draw[note]&&j>0&&dp[i-1][j-1]) dp[i][j] = 1;//draw
			if(blow[note]&&j<2*X&&dp[i-1][j+1]) dp[i][j] = 2;//blow
			if(i==S&&dp[i][j]!=0) sol = j;
		}
	}
	return sol>=0;
}

int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(0);cout.tie(0);
	int t;
	cin>>t;
	while(t-->0)
	{
		cin>>N>>S;
		int blow[2*N+1]{};
		for(int i=0;i<N;i++)
		{
			int a;
			cin>>a;			
			blow[a]=i+1;
		}
		int draw[2*N+1]{};
		for(int i=0;i<N;i++)
		{
			int a;
			cin>>a;		
			draw[a]=-i-1;
		}
		int song[S];
		for(int i=0;i<S;i++) cin>>song[i];
		int lo = 0;
		int hi = S+1;
		while(lo<hi)
		{
			int mid = (lo+hi)/2;
			if(func(mid,song,blow,draw))
				hi = mid;
			else
				lo = mid+1;
		}
		cout<<lo<<"\n";
	}
	return 0;
}
