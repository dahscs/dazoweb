#include <iostream>
#include <vector>

//Author: Evan Partidas
//NOTE: I re-programmed this solution, inspired by Alberto Alvarez's Solution

using namespace std;

const int MAXN  = 1000;

int dp[MAXN][MAXN][4];
int visited[MAXN][MAXN][4];
bool board[MAXN][MAXN];
int dirx[] = {-1,0,1,0};
int diry[] = {0,1,0,-1};
int calc(int x,int y,int d)
{
	if(visited[x][y][d]) return dp[x][y][d];
	int val = 0;
	vector<int> xpath,ypath,dpath;
	while(!visited[x][y][d])
	{
		xpath.push_back(x);
		ypath.push_back(y);
		dpath.push_back(d);
		visited[x][y][d]=1;
		dp[x][y][d] = val++;
		int nx = x+dirx[d];
		int ny = y+diry[d];
		int nd = d;
		if(!board[nx][ny])
		{
			nx = x;
			ny = y;
			nd = (d+1)%4;
		}
		x = nx;
		y = ny;
		d = nd;
	}
	int cyclelen;
	int i=xpath.size()-1;
	if(visited[x][y][d]==1)
	{
		cyclelen = val-dp[x][y][d];
		for(;i>=0;i--)
		{
			int cx = xpath[i];
			int cy = ypath[i];
			int cd = dpath[i];
			dp[cx][cy][cd] = cyclelen;
			visited[cx][cy][cd] = 2;
			if(cx==x&&cy==y&&cd==d) break;
		}
		i--;
	}
	else cyclelen = dp[x][y][d]; //visited[x][y][d]==2
	for(;i>=0;i--)
	{
		int cx = xpath[i];
		int cy = ypath[i];
		int cd = dpath[i];
		visited[cx][cy][cd]=2;
		dp[cx][cy][cd] = ++cyclelen;
	}
	return cyclelen;
}

int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(0);cout.tie(0);
	int n;
	cin>>n;
	for(int i=0;i<n;i++)
	{
		for(int j=0;j<n;j++)
		{
			char c;
			cin>>c;
			board[i][j] = (c=='.');
		}
	}
	int m = 0;
	int x,y,dir;
	for(int i=0;i<n;i++)
		for(int j=0;j<n;j++)
			if(board[i][j]) 
				for(int d=0;d<4;d++)
				{
					
					if(calc(i,j,d)>m)
					{
						x=i;
						y=j;
						dir = d;
						m = dp[i][j][d];
					}
				}	
	printf("%d %d %d %d\n",x,y,dir,m);
	return 0;
}
