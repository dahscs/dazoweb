#include <iostream>

//Author: Evan Partidas

using namespace std;

const int MAXN  = 1000;

int dp[MAXN][MAXN][4];
int visited[MAXN][MAXN][4];
bool board[MAXN][MAXN];
int dirx[] = {-1,0,1,0};
int diry[] = {0,1,0,-1};
/*
 * This is the main logic of the program.
 * For the visited array:
 * A value of 0 means a node is unvisited
 * A value of 1 means a node is currently being relaxed
 * A value of 2 means a node is part of a cycle
 * A value of 3 means a node is not part of a cycle or is the head of a cycle.
 * 
 * Note:
 * I don't recommend coding like this if you are not extremely good
 * with thinking recursively. I coded it like this for reading purposes.
 * When I initially solved this problem I coded it very differently. 
 * There are many other ways to solve this problem but this is the 
 * cleanest code I came up with.
 */
int calc(int x,int y,int d,int val)
{
	if(visited[x][y][d]==1)
	{
		dp[x][y][d] = val-dp[x][y][d];//Length of the cycle
		visited[x][y][d] = 2;//Mark the head of the cycle
		return dp[x][y][d];
	}
	if(visited[x][y][d]>1)
	{
		visited[x][y][d]=3;//This is for the backtrack if statement
		return dp[x][y][d]+min(val,1);//calc(x,y,d,0) should not get a bonus 1 for no reason.
	}
	int ret = 0;
	int nx=x+dirx[d];
	int ny=y+diry[d];
	int nd = d;
	if(!board[nx][ny])
	{
		nx = x;
		ny = y;
		nd = (d+1)%4;
	}
	visited[x][y][d] = 1;
	dp[x][y][d] = val;
	ret = calc(nx,ny,nd,val+1);
	dp[x][y][d] = ret;
	if(visited[x][y][d]==2||visited[nx][ny][nd]==3)
	{//As I backtrack, I increment the value by 1 (this is for nodes outside the cycle)
		visited[x][y][d]=3;
		ret++;
	}
	else visited[x][y][d] = 2;
	return ret;
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
					
					if(calc(i,j,d,0)>m)
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
