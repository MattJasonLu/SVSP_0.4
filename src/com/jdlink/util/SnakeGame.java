package com.jdlink.util;

import java.awt.*;
import java.util.LinkedList;
import java.util.Scanner;
/**
 * @author aachen0
 * @date 2018/3/27 13:56
 * IDE:IntelliJ IDEA
 */
public class SnakeGame {
    static final int WIDTH = 40, HEIGHT = 10;
    static char[][] map = new char[HEIGHT][WIDTH];
    public static void main(String[] args) {
        SnakeGame snakeGame = new SnakeGame();
        snakeGame.initBackground();//初始化背景，放只虫子
        SnakeLine snakeLine = new SnakeLine();
        snakeLine.initSnake();//初始化一条蛇
        snakeGame.putSnakeInMap(snakeLine);
        snakeGame.show();//显示一下
        //键盘移动蛇进行游戏
        Scanner scanner = new Scanner(System.in);
        int move;
        while (true) {
            System.out.println("输入AWSD控制蛇的移动，Q退出游戏");
            String choice = scanner.next();
            switch (choice) {
                case "a":
                case "A":
                    move = 2;
                    break;
                case "s":
                case "S":
                    move = 1;
                    break;
                case "w":
                case "W":
                    move = 3;
                    break;
                case "d":
                case "D":
                    move = 0;
                    break;
                case "q":
                case "Q":
                    int points=snakeLine.snakePoints.size();
                    snakeGame.putGameOverInMap(points);
                default:
                    System.out.println("输入有误，请重试");
                    continue;
            }
            if (snakeLine.move(move) == -1) {
                snakeGame.putGameOverInMap(snakeLine.snakePoints.size());
                snakeGame.show();
                break;
            }
            snakeGame.putSnakeInMap(snakeLine);
            snakeGame.show();
        }
    }
    //用字符画背景
    private void initBackground() {
        for (int i = 0; i < HEIGHT; i++) {//外围控制行
            for (int j = 0; j < WIDTH; j++) {//内循环控制各行的第几个
                this.map[i][j] = (j == 0 || (j == WIDTH - 1) || i == 0 || (i == HEIGHT - 1)) ? '*' : ' ';
            }
        }
    }
    //显示背景
    public void show() {
        int height = map.length;
        int width = map[0].length;
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                System.out.print(map[i][j]);
            }
            System.out.println();
        }
    }
    //把加到地图
    void putSnakeInMap(SnakeLine snakeLine) {
        Point p;
        this.initBackground();
        map[SnakeLine.food.y][SnakeLine.food.x] = SnakeLine.worm;
        for (int i = 0; i < snakeLine.snakePoints.size(); i++) {
            p = snakeLine.snakePoints.get(i);
            if (p.y > 0 && p.y < HEIGHT - 1 && p.x > 0 && p.x < WIDTH - 1) {
                map[p.y][p.x] = (i == 0) ? snakeLine.head : snakeLine.body;
            } else {
                putGameOverInMap(snakeLine.snakePoints.size());
            }
        }
    }
    void putGameOverInMap(int points) {
        char[] gameOver = ("GameOver Score:"+(points-3)).toCharArray();
        for (int i = 0; i < gameOver.length; i++) {
            map[HEIGHT / 2 - 1][i + (WIDTH - gameOver.length) / 2] = gameOver[i];
        }
        show();
        System.exit(1);
    }
}
class SnakeLine {
    static final int RIGHT = 0, DOWN = 1, LEFT = 2, UP = 3;
    static final char head = 'O', body = 'o', worm = '~';//头和身体表示
    static Point food = new Point((int) (Math.random() * (SnakeGame.WIDTH - 2)) + 1, (int) (Math.random() * (SnakeGame.HEIGHT - 2)) + 1);
    private void newFood() {
        food = new Point((int) (Math.random() * (SnakeGame.WIDTH - 2)) + 1, (int) (Math.random() * (SnakeGame
                .HEIGHT - 2)) + 1);
    }
    LinkedList<Point> snakePoints = new LinkedList<>();//蛇的身体内容
    void initSnake() {
        Point head = new Point(SnakeGame.WIDTH / 2, SnakeGame.HEIGHT / 2);
        snakePoints.addFirst(head);//头
        snakePoints.addLast(new Point(head.x - 1, head.y));
        snakePoints.addLast(new Point(head.x - 2, head.y));
    }
    int move(int orient) {
        Point p = snakePoints.getFirst();
        Point np = null;
        switch (orient) {
            case SnakeLine.RIGHT:
                np = new Point(p.x + 1, p.y);
                break;
            case SnakeLine.LEFT:
                np = new Point(p.x - 1, p.y);
                break;
            case SnakeLine.DOWN:
                np = new Point(p.x, p.y + 1);
                break;
            case SnakeLine.UP:
                np = new Point(p.x, p.y - 1);
                break;
        }
        if (snakePoints.contains(np)) {
            return -1;//咬到自己了
        }
        snakePoints.addFirst(np);
        if (np.equals(food)) {//吃到食物了
            newFood();
            return 2;
        }
        snakePoints.removeLast();
        return 1;
    }
}
