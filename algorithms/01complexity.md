# algorithm

## 什么是算法

- 算法是用于解决特定问题的一系列的执行步骤
- 使用不同算法，解决同一个问题，效率可能相差非常大
- 举例：求第 n 个斐波那契数

```java
public class Fibonacci {

    // fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21...

    public static void main (String[] args) {
        int n = 8;
        //System.out.println(fibonacci01(n));
        System.out.println(fibonacci02(n));
    }

    static int fibonacci01 (int n) {
        if (n <= 1) {
            return n;
        }

        return fibonacci01(n - 1) + fibonacci01(n - 2);
    }

    static int fibonacci02 (int n) {
        if (n <= 1) return n;

        int num1 = 0;
        int num2 = 1;

        for (int i = 0; i < n - 1; i++) {
            int sum = num1 + num2;
            num1 = num2;
            num2 = sum;
        }

        return num2;
    }
}
```

---

## 如何评价一个算法的好坏

### 如果单从执行效率上进行评估

- 可能会想到这么一种方案
- 比较不同算法对同一组输入的执行处理时间
- 这种方案也叫做：事后统计法

> 上述方案有比较明显的缺点
>
> > 执行时间严重依赖硬件以及运行时各种不确定的环境因素
> > 必须编写相应的测算代码
> > 测试数据的选择比较难保证公正性

### 一般从以下维度来评估算法的优劣

- 正确性、可读性、健壮性（对不合理输入的反应能力和处理能力）
- 时间复杂度（time complexity）：估算程序指令的执行次数（执行时间）
- 空间复杂度（space complexity）：估算所需占用的存储空间
- 现阶段大多数时候都是使用时间复杂度来进行评估，但一些特殊设备还是需要评估空间复杂度

### 时间复杂度(time complexity)

```java
public class EvaluateAlgorithm {
    // 测算下面方法的运算次数, 执行一条语句算一次
    // 使用大O表示法来表示时间复杂度和空间复杂度

    // 14
    public static void test1(int n) {
        if (n > 10) {
            System.out.println("n > 10");
        } else if (n > 5) {
            System.out.println("n > 5");
        } else {
            System.out.println("n <= 5");
        }

        for (int i = 0; i < 4; i++) {
            System.out.println("test");
        }
    }

    // 1 + 3n
    public static void test2 (int n) {
        for (int i = 0; i < n; i++) {
            System.out.println("test2");
        }
    }

    // 3n^2 + 3n + 1
    public static void test3 (int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.println("test3");
            }
        }
    }

    // 48n + 1
    public static void test4 (int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < 15; j++) {
                System.out.println("test4");
            }
        }
    }

    // log2(n)
    public static void test5 (int n) {
        while((n = n / 2) > 0) {
            System.out.println("test5");
        }
    }

    // log5(n)
    public static void test6 (int n) {
        while((n = n / 5) > 0) {
            System.out.println("test6");
        }
    }

    // i += i => i = 2 * i
    // 3log2(n) + 3nlog2(n) + 1
    public static void test7 (int n) {
        for (int i = 0; i < n; i += i) {
            for (int j = 0; j < n; j++) {
                System.out.println("test7");
            }
        }
    }

    // 空间复杂度为O(n)
    public static void test8 (int n) {
        int a = 10;
        int b = 20;
        int c = a + b;
        int[] array = new int[n];
        for (int i = 0; i < array.length; i++) {
            System.out.println(array[i] + c);
        }
    }
}

```

---

## 大 O 表示法

> 一般用大 O 表示法来描述复杂度，它表示的是数据规模 n 对应的复杂度
> 忽略常数、系数、低阶

- 9 >> O(1)
- 2n + 3 >> O(n)
- n2 + 2n + 6 >> O(n2)
- 4n3 + 3n2 + 22n + 100 >> O(n3)
- 写法上，n3 等价于 n^3

> 注意：大 O 表示法仅仅是一种粗略的分析模型，是一种估算，能帮助我们短时间内了解一个算法的执行效率

- 对数阶的细节
  - 对数阶一般省略底数
  - 因为 log2n = log29 ∗ log9n
  - 所以 log2n 、log9n 统称为 logn

> 注意： 实际上最终语句会被解析为汇编指令，计算机实际运行的是汇编语句, 但是并不影响使用大 O 方法来进行算法评估

### 常见的复杂度

| **执行次数**          | **复杂度** | **非正式术语** |
| --------------------- | ---------- | -------------- |
| 12                    | O(1)       | 常数阶         |
| 2n + 3                | O(n)       | 线性阶         |
| 4n^2^ + 2n + 6        | O(n^2^)    | 平方阶         |
| 4log~2~n + 25         | O(logn)    | 对数阶         |
| 3n + 2nlogn + 15      | O(nlogn)   | nlogn 阶       |
| 4n³ + 3n² + 22n + 100 | O(n³)      | 立方阶         |
| 2ⁿ                    | O(2ⁿ)      | 指数阶         |

- O(1) < O(logn) < O(n) < O(nlogn) < O(n2) < O(n3) < O(2n) < O(n!) < O(nn)

- [可以借助函数图像绘制工具对比复杂度的大小](https://zh.numberempire.com/graphingcalculator.php)

### fib 函数的时间复杂度的分析

- 2 种方法的区别：一个是递归，一个是 for 循环
- 如果有一台 1GHz 的普通计算机，运算速度 109 次每秒（ n 为 64 ）
- for 方法：O(n) 大约耗时 6.4 ∗ 10−8 秒
- 递归方法：O(2n) 大约耗时 584.94 年
- 有时候算法之间的差距，往往比硬件方面的差距还要大

> 斐波那契的线性代数解法 – 特征方程 -> 时间复杂度视为 O(1)
> 根据特征方程

<font color="red">**斐波那契数列的线行特征方程是如何求得的**</font>

$F(n) = \frac{1}{\sqrt{5}}[(\frac{1 + \sqrt{5}}{2})^n - (\frac{1 - \sqrt{5}}{2})^n]$

```java
public static int fibonacci03(int n) {
    double c = Math.sqrt(5);
    return (int)((Math.pow((1 + c) / 2, n) - Math.pow((1 - c) / 2, n)) / c);
}
```

---

## 算法的优化方向

- 用尽量少的存储空间
- 用尽量少的执行步骤（执行时间）
- 根据情况，可以
  - 空间换时间
  - 时间换空间

---

## 多个数据规模的情况

- 多个数据规模就是将各个规模相加，用大 O 表示
- O(n + k)

```java
public class MultipleN {

    public static void test (int n, int k) {
        for (int i = 0; i < n; i++) {
            System.out.println("test n");
        }

        for (int i = 0; i < k; i++) {
            System.out.println("test k");
        }
    }
}
```

---

## 更多复杂度

- 最好、最坏复杂度
- 均摊复杂度
- 复杂度震荡
- 平均复杂度

## 用于练习算法的 leetcode

- https://leetcode.com/
- https://leetcode-cn.com/
- [leetcode-斐波那契数](https://leetcode-cn.com/problems/fibonacci-number/)
