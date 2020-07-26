import java.util.*;
import java.io.*;

//Author: Alberto Alvarez

public class Main {

    public static int lungCap, blow[], draw[], song[], solution[], dp[][];

    public static int DazoRecursion(int index, int lung) {

        if(index == song.length)
            return Math.abs(lung);

        if(dp[index][lung+song.length] != 0)
            return dp[index][lung+song.length];

        int note = song[index];
        if(draw[note] != 0 && blow[note] != 0)
            return dp[index][lung+song.length] = Math.max(Math.abs(lung), Math.min(DazoRecursion(index+1, lung+1), DazoRecursion(index+1,lung-1)));
        else if(draw[note] != 0)
            return dp[index][lung+song.length] = Math.max(Math.abs(lung), DazoRecursion(index+1,lung-1));
        else
            return dp[index][lung+song.length] = Math.max(Math.abs(lung), DazoRecursion(index+1,lung+1));

    }

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter pw = new PrintWriter(new OutputStreamWriter(System.out));
        StringTokenizer st;

        int T = Integer.parseInt(br.readLine());

        while(T-- > 0) {

            st = new StringTokenizer(br.readLine());
            int N = Integer.parseInt(st.nextToken());
            int S = Integer.parseInt(st.nextToken());

            blow = new int[2*N+1];
            draw = new int[2*N+1];
            song = new int[S];
            dp = new int[S][2*S+1];

            st = new StringTokenizer(br.readLine());
            for(int i = 1; i <= N; i++)
                blow[Integer.parseInt(st.nextToken())] = i;

            st = new StringTokenizer(br.readLine());
            for(int i = 1; i <= N; i++)
                draw[Integer.parseInt(st.nextToken())] = i;

            st = new StringTokenizer(br.readLine());
            for(int i = 0; i < S; i++)
                song[i] = Integer.parseInt(st.nextToken());

            pw.println(DazoRecursion(0,0));
        }

        pw.flush();
    }

}

 		   			 	  		    	 		  	 		
