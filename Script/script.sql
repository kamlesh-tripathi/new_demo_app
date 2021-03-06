USE [master]
GO
/****** Object:  Database [MeetingDemo]    Script Date: 21-08-2020 15:57:18 ******/
CREATE DATABASE [MeetingDemo]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MeetingDemo', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\MeetingDemo.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MeetingDemo_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\MeetingDemo_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [MeetingDemo] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MeetingDemo].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MeetingDemo] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MeetingDemo] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MeetingDemo] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MeetingDemo] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MeetingDemo] SET ARITHABORT OFF 
GO
ALTER DATABASE [MeetingDemo] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MeetingDemo] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MeetingDemo] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MeetingDemo] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MeetingDemo] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MeetingDemo] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MeetingDemo] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MeetingDemo] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MeetingDemo] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MeetingDemo] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MeetingDemo] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MeetingDemo] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MeetingDemo] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MeetingDemo] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MeetingDemo] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MeetingDemo] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MeetingDemo] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MeetingDemo] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [MeetingDemo] SET  MULTI_USER 
GO
ALTER DATABASE [MeetingDemo] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MeetingDemo] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MeetingDemo] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MeetingDemo] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MeetingDemo] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [MeetingDemo] SET QUERY_STORE = OFF
GO
USE [MeetingDemo]
GO
/****** Object:  Table [dbo].[EmpDetails]    Script Date: 21-08-2020 15:57:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmpDetails](
	[EmpId] [int] IDENTITY(1,1) NOT NULL,
	[EmpName] [varchar](50) NOT NULL,
	[UserName] [varchar](50) NOT NULL,
	[Password] [varchar](50) NOT NULL,
	[IsActive] [int] NULL,
	[TotalCnt] [int] NULL,
	[Status] [int] NOT NULL,
 CONSTRAINT [PK_EmpDetails] PRIMARY KEY CLUSTERED 
(
	[EmpId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MeetingDetails]    Script Date: 21-08-2020 15:57:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MeetingDetails](
	[MeetingId] [int] IDENTITY(1,1) NOT NULL,
	[MeetingSubject] [varchar](50) NOT NULL,
	[MeetingAttendees] [varchar](500) NOT NULL,
	[MeetingAgenda] [varchar](500) NOT NULL,
	[MeetingDateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_MeetingDetails] PRIMARY KEY CLUSTERED 
(
	[MeetingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[EmpDetails] ADD  CONSTRAINT [DF_EmpDetails_Status]  DEFAULT ((0)) FOR [Status]
GO
/****** Object:  StoredProcedure [dbo].[Usp_Login]    Script Date: 21-08-2020 15:57:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc  [dbo].[Usp_Login]  
@UserName varchar(50)='',  
@Password varchar(50)=''  
as begin  
    declare @UserId int =0,@TotalCnt int =0  
    select @UserId=EmpId,@TotalCnt=TotalCnt from  EmpDetails um   
    where UserName=@UserName and Password=@Password and IsActive=1  
    if(@TotalCnt>=5)  
    begin  
       select 0 empid,'' EmpName,'' UserName,'' Password, 0 IsActive,-1 Status  
    end  
    if(@UserId>0)  
    begin  
        select EmpId, EmpName, UserName, Password,IsActive,Status from  EmpDetails um   
        where EmpId=@UserId   
    end  
    else  
    begin  
       Update EmpDetails set @TotalCnt=TotalCnt+1    
       where UserName=@UserName and IsActive=1  
       select 0 EmpId,''empName,'' UserName,'' Password, 0 IsActive ,0 Status
    end  
    end
GO
USE [master]
GO
ALTER DATABASE [MeetingDemo] SET  READ_WRITE 
GO
