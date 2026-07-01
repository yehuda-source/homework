using System.Security.Cryptography.X509Certificates;

namespace Shirts;

public enum Colors
{
   red, green, blue 
}
public enum Patterns
{
    striped, checkered, plain
}
internal class Shirt
{
    public static List<Shirt> shirts = new List<Shirt>();
    static List<Colors> colors = new List<Colors>()
    {
        Colors.red, Colors.green, Colors.blue
    };
    static List<Patterns> patterns = new List<Patterns>()
    {
        Patterns.checkered, Patterns.plain, Patterns.striped
    };
    public Colors color;
    public Patterns pattern;
    static void Main(string[] args)
    {
        CreateAllShirts();
        PrintShirts();
    }
    
    public static void CreateAllShirts()
    {
        for(int i = 0; i < colors.Count; i++)
        {
            for(int j = 0; j < patterns.Count; j++)
            {
                Shirt shirt = new Shirt()
                {
                    color = colors[i],
                    pattern = patterns[j]
                };
                shirts.Add(shirt);
            }
         }
        
    }
    public static void PrintShirts()
    {
        foreach(Shirt shirt in shirts)
        {
            Console.WriteLine(shirt);
        }
    }
    public override string ToString()
    {
        return $"{color}:{pattern}";
    }
}

