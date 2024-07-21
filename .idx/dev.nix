{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.openssl
  ];
  idx.extensions = [
    
  
 "adamraichu.pdf-viewer"
 "PKief.material-icon-theme"
 "Prisma.prisma"
 "Prisma.prisma-insider"
 "PulkitGangwar.nextjs-app-directory-commands"
 "PulkitGangwar.nextjs-snippets"];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}