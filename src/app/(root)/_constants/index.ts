import { Monaco } from "@monaco-editor/react";
import { Theme } from "../../../types";

type LanguageConfig = Record<
  string,
  {
    id: string;
    label: string;
    logoPath: string;
    pistonRuntime: { language: string; version: string };
    monacoLanguage: string;
    defaultCode: string;
  }
>;

export const LANGUAGE_CONFIG: LanguageConfig = {
  javascript: {
    id: "javascript",
    label: "JavaScript",
    logoPath: "/javascript.png",
    pistonRuntime: { language: "javascript", version: "18.15.0" },
    monacoLanguage: "javascript",
    defaultCode: `// Basic JavaScript Example
let numbers = [5, 10, 15, 20];
let name = "Alice";

// Print array
console.log("Numbers:", numbers);

// Calculate sum
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}
console.log("Sum:", sum);

// Calculate average
let average = sum / numbers.length;
console.log("Average:", average);

// Simple greeting
console.log("Hello, " + name + "!");`,
  },
  typescript: {
    id: "typescript",
    label: "TypeScript",
    logoPath: "/typescript.png",
    pistonRuntime: { language: "typescript", version: "5.0.3" },
    monacoLanguage: "typescript",
    defaultCode: `// Basic TypeScript Example
let numbers: number[] = [3, 6, 9, 12];
let message: string = "Welcome!";

// Print array
console.log("Numbers:", numbers);

// Calculate sum
let sum: number = 0;
for (let num of numbers) {
    sum += num;
}
console.log("Sum:", sum);

// Calculate average
let average: number = sum / numbers.length;
console.log("Average:", average);

// Simple function
function greet(name: string): string {
    return "Hello, " + name;
}

console.log(greet("Bob"));`,
  },
  python: {
    id: "python",
    label: "Python",
    logoPath: "/python.png",
    pistonRuntime: { language: "python", version: "3.10.0" },
    monacoLanguage: "python",
    defaultCode: `# Basic Python Example
numbers = [4, 8, 12, 16, 20]
name = "Charlie"

# Print array
print("Numbers:", numbers)

# Calculate sum
total = sum(numbers)
print("Sum:", total)

# Calculate average
average = total / len(numbers)
print("Average:", average)

# Simple greeting
print(f"Hello, {name}!")

# Find maximum
print("Max number:", max(numbers))`,
  },
  java: {
    id: "java",
    label: "Java",
    logoPath: "/java.png",
    pistonRuntime: { language: "java", version: "15.0.2" },
    monacoLanguage: "java",
    defaultCode: `public class Main {
    public static void main(String[] args) {
        // Print squares of numbers from 1 to 5
        for (int i = 1; i <= 5; i++) {
            System.out.println("Square of " + i + " is " + (i * i));
        }
    }
}
`,
  },
  go: {
    id: "go",
    label: "Go",
    logoPath: "/go.png",
    pistonRuntime: { language: "go", version: "1.16.2" },
    monacoLanguage: "go",
    defaultCode: `package main

import "fmt"

func main() {
    // Basic Go Example
    numbers := []int{1, 3, 5, 7, 9}
    name := "Eve"
    
    // Print array
    fmt.Println("Numbers:", numbers)
    
    // Calculate sum
    sum := 0
    for _, num := range numbers {
        sum += num
    }
    fmt.Println("Sum:", sum)
    
    // Calculate average
    average := float64(sum) / float64(len(numbers))
    fmt.Printf("Average: %.2f\\n", average)
    
    // Simple greeting
    fmt.Println("Hello,", name+"!")
}`,
  },
  rust: {
    id: "rust",
    label: "Rust",
    logoPath: "/rust.png",
    pistonRuntime: { language: "rust", version: "1.68.2" },
    monacoLanguage: "rust",
    defaultCode: `fn main() {
    // Basic Rust Example
    let numbers = vec![6, 12, 18, 24, 30];
    let name = "Frank";
    
    // Print array
    println!("Numbers: {:?}", numbers);
    
    // Calculate sum
    let sum: i32 = numbers.iter().sum();
    println!("Sum: {}", sum);
    
    // Calculate average
    let average = sum as f64 / numbers.len() as f64;
    println!("Average: {:.2}", average);
    
    // Simple greeting
    println!("Hello, {}!", name);
    
    // Find largest number
    let max_num = numbers.iter().max().unwrap();
    println!("Largest: {}", max_num);
}`,
  },
  cpp: {
    id: "cpp",
    label: "C++",
    logoPath: "/cpp.png",
    pistonRuntime: { language: "cpp", version: "10.2.0" },
    monacoLanguage: "cpp",
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    // Basic C++ Example
    int numbers[] = {7, 14, 21, 28, 35};
    int size = 5;
    string name = "Grace";
    
    // Print array
    cout << "Numbers: ";
    for (int i = 0; i < size; i++) {
        cout << numbers[i] << " ";
    }
    cout << endl;
    
    // Calculate sum
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += numbers[i];
    }
    cout << "Sum: " << sum << endl;
    
    // Calculate average
    double average = (double)sum / size;
    cout << "Average: " << average << endl;
    
    // Simple greeting
    cout << "Hello, " << name << "!" << endl;
    
    return 0;
}`,
  },
  csharp: {
    id: "csharp",
    label: "C#",
    logoPath: "/csharp.png",
    pistonRuntime: { language: "csharp", version: "6.12.0" },
    monacoLanguage: "csharp",
    defaultCode: `using System;

class Program {
    static void Main() {
        // Basic C# Example
        int[] numbers = {10, 20, 30, 40, 50};
        string name = "Henry";
        
        // Print array
        Console.Write("Numbers: ");
        foreach (int num in numbers) {
            Console.Write(num + " ");
        }
        Console.WriteLine();
        
        // Calculate sum
        int sum = 0;
        foreach (int num in numbers) {
            sum += num;
        }
        Console.WriteLine("Sum: " + sum);
        
        // Calculate average
        double average = (double)sum / numbers.Length;
        Console.WriteLine("Average: " + average);
        
        // Simple greeting
        Console.WriteLine("Hello, " + name + "!");
    }
}`,
  },
  ruby: {
    id: "ruby",
    label: "Ruby",
    logoPath: "/ruby.png",
    pistonRuntime: { language: "ruby", version: "3.0.1" },
    monacoLanguage: "ruby",
    defaultCode: `# Basic Ruby Example
numbers = [8, 16, 24, 32, 40]
name = "Ivy"

# Print array
puts "Numbers: #{numbers.join(', ')}"

# Calculate sum
sum = numbers.sum
puts "Sum: #{sum}"

# Calculate average
average = sum.to_f / numbers.length
puts "Average: #{average}"

# Simple greeting
puts "Hello, #{name}!"

# Find minimum
puts "Smallest: #{numbers.min}"`,
  },
  swift: {
    id: "swift",
    label: "Swift",
    logoPath: "/swift.png",
    pistonRuntime: { language: "swift", version: "5.3.3" },
    monacoLanguage: "swift",
    defaultCode: `// Basic Swift Example
let numbers = [9, 18, 27, 36, 45]
let name = "Jack"

// Print array
print("Numbers: \\(numbers)")

// Calculate sum
let sum = numbers.reduce(0, +)
print("Sum: \\(sum)")

// Calculate average
let average = Double(sum) / Double(numbers.count)
print("Average: \\(average)")

// Simple greeting
print("Hello, \\(name)!")

// Find maximum
let maxNumber = numbers.max() ?? 0
print("Largest: \\(maxNumber)")`,
  },
};

export const THEMES: Theme[] = [
  { id: "vs-dark", label: "VS Dark", color: "#1e1e1e" },
  { id: "vs-light", label: "VS Light", color: "#ffffff" },
  { id: "github-dark", label: "GitHub Dark", color: "#0d1117" },
  { id: "monokai", label: "Monokai", color: "#272822" },
  { id: "solarized-dark", label: "Solarized Dark", color: "#002b36" },
];

export const THEME_DEFINITONS = {
  "github-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6e7681" },
      { token: "string", foreground: "a5d6ff" },
      { token: "keyword", foreground: "ff7b72" },
      { token: "number", foreground: "79c0ff" },
      { token: "type", foreground: "ffa657" },
      { token: "class", foreground: "ffa657" },
      { token: "function", foreground: "d2a8ff" },
      { token: "variable", foreground: "ffa657" },
      { token: "operator", foreground: "ff7b72" },
    ],
    colors: {
      "editor.background": "#0d1117",
      "editor.foreground": "#c9d1d9",
      "editor.lineHighlightBackground": "#161b22",
      "editorLineNumber.foreground": "#6e7681",
      "editorIndentGuide.background": "#21262d",
      "editor.selectionBackground": "#264f78",
      "editor.inactiveSelectionBackground": "#264f7855",
    },
  },
  monokai: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "75715E" },
      { token: "string", foreground: "E6DB74" },
      { token: "keyword", foreground: "F92672" },
      { token: "number", foreground: "AE81FF" },
      { token: "type", foreground: "66D9EF" },
      { token: "class", foreground: "A6E22E" },
      { token: "function", foreground: "A6E22E" },
      { token: "variable", foreground: "F8F8F2" },
      { token: "operator", foreground: "F92672" },
    ],
    colors: {
      "editor.background": "#272822",
      "editor.foreground": "#F8F8F2",
      "editorLineNumber.foreground": "#75715E",
      "editor.selectionBackground": "#49483E",
      "editor.lineHighlightBackground": "#3E3D32",
      "editorCursor.foreground": "#F8F8F2",
      "editor.selectionHighlightBackground": "#49483E",
    },
  },
  "solarized-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "586e75" },
      { token: "string", foreground: "2aa198" },
      { token: "keyword", foreground: "859900" },
      { token: "number", foreground: "d33682" },
      { token: "type", foreground: "b58900" },
      { token: "class", foreground: "b58900" },
      { token: "function", foreground: "268bd2" },
      { token: "variable", foreground: "b58900" },
      { token: "operator", foreground: "859900" },
    ],
    colors: {
      "editor.background": "#002b36",
      "editor.foreground": "#839496",
      "editorLineNumber.foreground": "#586e75",
      "editor.selectionBackground": "#073642",
      "editor.lineHighlightBackground": "#073642",
      "editorCursor.foreground": "#839496",
      "editor.selectionHighlightBackground": "#073642",
    },
  },
};

// Helper function to define themes in Monaco
export const defineMonacoThemes = (monaco: Monaco) => {
  Object.entries(THEME_DEFINITONS).forEach(([themeName, themeData]) => {
    monaco.editor.defineTheme(themeName, {
      base: themeData.base as "vs" | "vs-dark" | "hc-black",
      inherit: themeData.inherit,
      rules: themeData.rules.map((rule) => ({
        ...rule,
        foreground: rule.foreground,
      })),
      colors: themeData.colors,
    });
  });
};