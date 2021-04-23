##Initialize variables
$skips = @("secret/")
$configFile = "$PSScriptRoot\secret\mysql.config"

##Declare functions
function Execute-Script
{

    param
    (
        [Parameter(Mandatory=$true)][PSCustomObject]$Path
    )

    try
    {
        $cmd = "cmd.exe /c `"mysql --defaults-extra-file=$configFile -h localhost BasicApp < $($Path.FullName)`""
        Invoke-Expression $cmd
    }
    catch {
        Write-Error "Script failed: $_" -ErrorAction Continue
    }
}

function Check-Skip 
{

    param
    (
        [Parameter(Mandatory=$true)][PSCustomObject]$Item,
        [Parameter(Mandatory=$false)][String[]]$Skips = $skips
    )
    
    if ($Skips.ForEach({$_ | Where-Object -FilterScript {($Item.FullName -replace "\\","/") -match $_}}))
    {
        if ($Item.PSIsContainer)
        {
            $FileName = ($Item.FullName -split "\\")[-2..-1] -join "\"
        } 
        else 
        {
            $FileName = ($Item.FullName -split "\\")[-3..-1] -join "\"
        }
        Write-Host "Skipping $FileName..." -ForegroundColor Yellow
        continue;
    }
}

function Loop-DirectoryFiles
{
    param
    (
        [Parameter(Mandatory=$true)][String]$Directory
    )

    foreach($item in (Get-ChildItem -Path $Directory))
    {
        ##Check if this should be skipped, if so skip it
        Check-Skip -Item $item

        ##If the item is directory, recurse through it
        if ($item.PSIsContainer) 
        {
            Loop-DirectoryFiles -Directory $item.FullName
            continue;
        }

        $parentDirectorySubDirectoryItem = ($item.FullName -split "\\")[-3..-1] -join "\"
        Write-Host "Running $parentDirectorySubDirectoryItem..." -ForegroundColor Magenta

        Execute-Script -Path $item
    }
}

function Loop-Directories 
{
    param
    (
        [Parameter(Mandatory=$true)][String[]]$Paths
    )

    ##Loop through the subdirectory
    foreach($DirectoryPath in $Paths)
    {
        ##Check if the subdirectory does not exists, skip it
        if (!(Test-Path -Path $DirectoryPath))
        {
            continue;
        }

        $directory = Get-Item -Path $DirectoryPath
        
        ##Check if this should be skipped, if so skip it
        Check-Skip -Item $directory

        #$parentDirectorySubDirectory = ($directory.FullName -split "\\")[-2..-1] -join "\"
        #Write-Host "Running $parentDirectorySubDirectory..." -ForegroundColor Magenta

        Loop-DirectoryFiles -Directory $directory
    }
}

##Get the base directory
$parentDirectory = Get-Item -Path $PSScriptRoot

##Iterate through the directory, running scripts in necessary order,
## then running any other directories after
$orderedSubDirectoryNames = @("database", "tables", "data", "procedures")

##Get all subdirectories available within the parent directory
$subDirectories = Get-ChildItem -Path $parentDirectory | Where-Object -FilterScript {$_.PSIsContainer}

##Get the list of "other" subdirectories, to run after
$unorderedSubDirectories = $subDirectories.ForEach({$_ | Where-Object -FilterScript {$_.Name -notin $orderedSubDirectoryNames}})

##For ordered directories, run them in order
Loop-Directories -Paths ($orderedSubDirectoryNames.ForEach({"$parentDirectory\$_"}))

##Run the non-ordered directories
Loop-Directories -Paths ($unorderedSubDirectories.FullName)
