#include <iostream>
#include <algorithm>
#include <vector>

//Author: Evan Partidas

using namespace std;

int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(0);cout.tie(0);
	int t; cin>>t;
	while(t-->0)
	{
		int N,S,X;
		cin>>N>>S>>X;
		int blow[2*N+1]{};
		for(int i=0;i<N;i++)
		{
			int a; cin>>a;			
			blow[a]=i+1;
		}
		int draw[2*N+1]{};
		for(int i=0;i<N;i++)
		{
			int a; cin>>a;		
			draw[a]=-i-1;
		}
		//Calculate Solution
		int dp[S+1][2*X+1]{};
		int song[S];
		dp[0][X]=1;
		int sol = -1;
		for(int i=1;i<=S;i++)
		{
			cin>>song[i-1];
			for(int j=0;j<2*X+1;j++)
			{
				if(draw[song[i-1]]&&j>0&&dp[i-1][j-1]) dp[i][j] = 1;//draw
				if(blow[song[i-1]]&&j<2*X&&dp[i-1][j+1]) dp[i][j] = 2;//blow
				if(i==S&&dp[i][j]!=0) sol = j;
			}
		}
		//Construct solution
		if(sol==-1)
		{
			cout<<"0\n"; continue;
		}
		int ret[S];
		for(int i=S;i>0;i--)
		{
			ret[i-1] = (dp[i][sol]==1?draw:blow)[song[i-1]];
			sol += (dp[i][sol]==1)?-1:1;
		}
		//Print solution
		for(int i=0;i<S;i++)
		{
			cout<<ret[i]<<" ";
		}
		cout<<"\n";
	}
	return 0;
}
