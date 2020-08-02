import java.util.*;
import java.io.*;

//Author: Alberto Alvarez and Evan Partidas

public class Main {

    public static boolean[][] isWall;
    public static int[][][] visited;
    public static int[][][] looplen;

    public static final int[] R = {-1,0,1,0};
    public static final int[] C = {0,1,0,-1};

    public static int mash(int row, int col, int dir) {

	if(visited[row][col][dir]>0) return looplen[row][col][dir];
        int len = 0;
        ArrayDeque<Point> path = new ArrayDeque<>();
        while(visited[row][col][dir]==0) {
            path.offer(new Point(row, col, dir));
            visited[row][col][dir] = 1;
			looplen[row][col][dir] = len++;
            int Tr = row + R[dir], Tc = col + C[dir];
            if(!isWall[Tr][Tc]){
                row = Tr;
                col = Tc;
            }
            else
                dir = (dir+1)%4;

        }
	int cyclen = 0;
        if(visited[row][col][dir]==1) {
		cyclen = len - looplen[row][col][dir];
		while(!path.isEmpty())
		{
			Point p = path.pollLast();
			looplen[p.R][p.C][p.D] = cyclen;
			visited[p.R][p.C][p.D] = 2;
			if(p.R==row&&p.C==col&&p.D==dir) break;
		}
        }
	else cyclen = looplen[row][col][dir];
	
	while(!path.isEmpty())
	{
		Point p = path.pollLast();
		looplen[p.R][p.C][p.D] = ++cyclen;
		visited[p.R][p.C][p.D] = 2;
	}

        return cyclen;

    }

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        int N = Integer.parseInt(br.readLine());

        isWall = new boolean[N][N];
        visited = new int[N][N][4];
        looplen = new int[N][N][4];

        int maxRow = -1;
        int maxCol = -1;
        int maxDir = -1;
        int maxLen = -1;

        for(int i = 0; i < N; i++) {

            String row = br.readLine();
            for(int j = 0; j < N; j++)
                isWall[i][j] = row.charAt(j) == '#';
        }

        for(int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                if (!isWall[i][j])
                    for (int k = 0; k < 4; k++) {
                        int len = mash(i, j, k);
                        if (len > maxLen) {
                            maxRow = i;
                            maxCol = j;
                            maxDir = k;
                            maxLen = len;
                        }
                    }
        }
        System.out.printf("%d %d %d %d", maxRow, maxCol, maxDir, maxLen);

    }


    static class Point {
        int R,C,D;
        public Point(int r, int c, int d){
            R = r;
            C = c;
            D = d;
        }
    }

}

    	 	 	  	 	 		 		 	  		  		

