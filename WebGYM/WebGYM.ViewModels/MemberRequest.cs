namespace WebGYM.ViewModels
{
    public class MemberRequest
    {
        public string MemberName { get; set; }
    }
    public class MemberResponse
    {
       public string MemberNo { get; set; }
       public string MemberName { get; set; }
    }

    public class MemberNoRequest
    {
        public string MemberNo { get; set; }
    }
}